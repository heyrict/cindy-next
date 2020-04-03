import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  ReplayKeywordType,
} from 'reducers/types';
import { KeywordTreeNodeType } from './types';

export const counter = async (
  list: Array<ReplayKeywordType>,
  continueFrom?: ReplayKeywordCounterType,
): Promise<ReplayKeywordCounterType> => {
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
