import kuromoji, { Tokenizer, IpadicFeatures } from 'kuromoji';

import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  ReplayKeywordType,
} from 'reducers/types';
import { KeywordTreeNodeType } from './types';

let tokenizer: Tokenizer<IpadicFeatures> | undefined;

const loadTokenizer = () => {
  if (process.browser) {
    return new Promise<Tokenizer<IpadicFeatures>>((resolve, _reject) => {
      kuromoji
        .builder({
          dicPath: '/static/dict',
        })
        .build((_err, tok) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  } else {
    return new Promise<Tokenizer<IpadicFeatures>>((resolve, _reject) => {
      kuromoji
        .builder({
          dicPath: 'node_modules/kuromoji/dict',
        })
        .build((_err, tok) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  }
};

const defaultFilter = (word: IpadicFeatures): boolean =>
  (word.pos === '名詞' && word.pos_detail_1 !== '数') || word.pos === '動詞';

export const getKeywords = async (text: string, filter = defaultFilter) => {
  let tok = tokenizer || (await loadTokenizer());
  return tok
    .tokenize(text)
    .filter(filter)
    .map(o => ({ name: o.basic_form === '*' ? o.surface_form : o.basic_form }));
};

export const counter = (
  list: Array<ReplayKeywordType>,
  continueFrom?: ReplayKeywordCounterType,
): ReplayKeywordCounterType => {
  const counts = continueFrom || (new Object() as ReplayKeywordCounterType);
  list.forEach(k => {
    if (k.name in counts) counts[k.name] += 1;
    else counts[k.name] = 1;
  });
  return counts;
};

export const setNodeInChildren = (
  nameList: Array<ReplayKeywordType>,
  rootNode: KeywordTreeNodeType,
): void => {
  if (!nameList || nameList.length === 0) return;
  const keyword = nameList[0];
  const childIndex = rootNode.children.findIndex(
    node => node.name === keyword.name,
  );
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
  dialogues: Array<ReplayDialogueType>,
  diagToKeywords = (diag: ReplayDialogueType) => diag.question_keywords,
): KeywordTreeNodeType => {
  let tree = new Object({
    name: 'Root',
    children: [],
  }) as KeywordTreeNodeType;
  dialogues.forEach(dialogue => {
    setNodeInChildren(diagToKeywords(dialogue), tree);
  });
  return tree;
};

export const filterDialogueKeywords = (
  dialogues: Array<ReplayDialogueType>,
): Array<ReplayDialogueType> =>
  dialogues.map(dialogue => ({
    ...dialogue,
    question_keywords: dialogue.question_keywords.concat({
      name: dialogue.question,
    }),
  }));
