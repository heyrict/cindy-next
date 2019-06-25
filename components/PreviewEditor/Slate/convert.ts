import { allStamps } from 'stamps';
import { Block, Value, DocumentJSON } from 'slate';
//export const deserialize = Plain.deserialize;

const SPACE_START = new RegExp('^\\s+');
const SPACE_END = new RegExp('\\s+$');
const STAMP_MATCH = new RegExp(':[^: ]+:', 'g');

export const markup = (node: any) => {
  const startSpace = SPACE_START.exec(node.text);
  const endSpace = SPACE_END.exec(node.text);
  let text = node.text.replace(SPACE_START, '').replace(SPACE_END, '');
  node.marks.forEach((mark: { type: any }) => {
    switch (mark.type) {
      case 'bold':
        text = `**${text}**`;
        break;
      case 'italic':
        text = `*${text}*`;
        break;
      case 'delete':
        text = `~~${text}~~`;
        break;
      default:
        console.warn(
          `Unhandled mark type ${mark.type} at PreviewEditor.slate.convert.markup`,
        );
    }
  });
  return `${startSpace === null ? '' : ' '}${text}${
    endSpace === null ? '' : ' '
  }`;
};

export const serializeNode = (node: any) => {
  if (
    node.object === 'document' ||
    (node.object === 'block' && Block.isBlockList(node.nodes))
  ) {
    return node.nodes.map(serializeNode).join('\n');
  } else if (node.object === 'block') {
    return node.nodes.map(serializeNode).join('');
  } else if (node.type === 'stamp') {
    return ` :${node.data.get('key')}: `;
  } else {
    return markup(node);
  }
};

export const serialize = (node: { document: any }) =>
  serializeNode(node.document);

const genTextNode = (text: string) => ({
  object: 'text',
  text,
});

const genStampNode = (key: string, src: string) => ({
  type: 'stamp',
  object: 'inline',
  nodes: [
    {
      object: 'text',
      text: '',
      marks: [],
    },
  ],
  data: {
    key,
    src,
  },
});

const lineToNode = (line: string) => {
  const nodes = [];
  let stampMatch = STAMP_MATCH.exec(line);
  let startIndex = 0;
  let endIndex = 0;

  while (stampMatch !== null) {
    // Test if match is a stamp
    const key = stampMatch[0].substr(1, stampMatch[0].length - 2);
    if (key in allStamps) {
      const src = allStamps[key as keyof typeof allStamps];
      endIndex = stampMatch.index;

      nodes.push(genTextNode(line.substr(startIndex, endIndex)));
      nodes.push(genStampNode(key, src));
      startIndex = endIndex + stampMatch[0].length;
    }
    stampMatch = STAMP_MATCH.exec(line);
  }

  nodes.push(genTextNode(line.substr(startIndex)));

  return {
    object: 'block',
    type: 'line',
    nodes,
  };
};

export const deserialize = (text: string) =>
  Value.fromJS({
    document: {
      nodes: text.split('\n').map(line => lineToNode(line)),
    } as DocumentJSON,
  });
