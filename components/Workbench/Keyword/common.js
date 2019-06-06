import kuromoji from 'kuromoji';

let tokenizer;

const loadTokenizer = () => {
  if (process.browser) {
    return new Promise((resolve, reject) => {
      kuromoji
        .builder({
          dicPath: '/static/dict',
        })
        .build((err, tok) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      kuromoji
        .builder({
          dicPath: 'node_modules/kuromoji/dict',
        })
        .build((err, tok) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  }
};

const defaultFilter = word =>
  (word.pos === '名詞' && word.pos_detail_1 !== '数') || word.pos === '動詞';

export const getKeywords = async (text, filter = defaultFilter) => {
  let tok = tokenizer || (await loadTokenizer());
  return tok
    .tokenize(text)
    .filter(defaultFilter)
    .map(o => (o.basic_form === '*' ? o.surface_form : o.basic_form));
};

export const counter = async (list, continueFrom) => {
  const counts = continueFrom || new Object();
  list.forEach(v => {
    if (v in counts) counts[v] += 1;
    else counts[v] = 1;
  });
  return counts;
};

export const setNodeInChildren = (nameList, rootNode) => {
  if (!nameList || nameList.length === 0) return;
  const name = nameList[0];
  const childIndex = rootNode.children.findIndex(node => node.name === name);
  if (childIndex === -1) {
    rootNode.children.push({
      name,
      children: [],
    });
    setNodeInChildren(
      nameList.slice(1),
      rootNode.children[rootNode.children.length - 1],
    );
  } else {
    setNodeInChildren(nameList.slice(1), rootNode.children[childIndex]);
  }
};

export const constructTree = (
  dialogues,
  diagToKeywords = diag => diag.keywords,
) => {
  let tree = new Object({
    name: 'Root',
    children: [],
  });
  dialogues.forEach(dialogue => {
    setNodeInChildren(diagToKeywords(dialogue), tree);
  });
  return tree;
};

export const filterDialogueKeywords = (dialogues, keywords) =>
  dialogues.map(dialogue => ({
    ...dialogue,
    question_keywords: dialogue.question_keywords
      .filter(keyword => keywords[keyword].use === true)
      .concat(dialogue.question),
  }));
