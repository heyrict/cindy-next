import { allStamps } from 'stamps';
import { Node as SlateNode, Block, Value, Mark } from 'slate';
//import Plain from 'slate-plain-serializer';
//export const deserialize = Plain.deserialize;

const SPACE_START = new RegExp('^\\s+');
const SPACE_END = new RegExp('\\s+$');
const STAMP_MATCH = new RegExp(':[^: ]+:', 'g');

export const markup = node => {
  const startSpace = SPACE_START.exec(node.text);
  const endSpace = SPACE_END.exec(node.text);
  let text = node.text.replace(SPACE_START, '').replace(SPACE_END, '');
  node.marks.forEach(mark => {
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
          `Unhandled mark type ${mark.type} at PreviewEditor.convert.markup`,
        );
    }
  });
  return `${startSpace === null ? '' : ' '}${text}${
    endSpace === null ? '' : ' '
  }`;
};

export const serializeNode = node => {
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

export const serialize = node => serializeNode(node.document);

const genTextNode = text => ({
  object: 'text',
  text,
});

const genStampNode = (key, src) => ({
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

const lineToNode = line => {
  const nodes = [];
  let stampMatch = STAMP_MATCH.exec(line);
  let startIndex = 0;
  let endIndex = 0;

  while (stampMatch !== null) {
    // Test if match is a stamp
    const key = stampMatch[0].substr(1, stampMatch[0].length - 2);
    const src = allStamps[key];
    endIndex = stampMatch.index;
    if (!src) {
      stampMatch = STAMP_MATCH.exec(line);
      continue;
    }

    nodes.push(genTextNode(line.substr(startIndex, endIndex)));
    nodes.push(genStampNode(key, src));
    startIndex = endIndex + stampMatch[0].length;

    stampMatch = STAMP_MATCH.exec(line);
  }

  nodes.push(genTextNode(line.substr(startIndex)));

  return {
    object: 'block',
    type: 'line',
    nodes,
  };
};

export const deserialize = text =>
  Value.fromJSON({
    document: {
      nodes: text.split('\n').map(line => lineToNode(line)),
    },
  });
