import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  ReplayKeywordType,
} from 'reducers/types';
import { KeywordTreeNodeType, KeywordTreeLeafType } from './types';

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

export function setNodeInChildren<T>(
  nameList: Array<ReplayKeywordType>,
  rootNode: KeywordTreeNodeType<T>,
  leaf: T,
): void {
  if (!nameList || nameList.length === 0) return;
  const keyword = nameList[0];
  const childIndex = rootNode.children.findIndex(
    node => node.name === keyword.name,
  );
  if (childIndex === -1) {
    rootNode.children.push({
      name: keyword.name,
      children: [],
      leaves: leaf && nameList.length === 1 ? [leaf] : [],
    });
    setNodeInChildren(
      nameList.slice(1),
      rootNode.children[rootNode.children.length - 1],
      leaf,
    );
  } else {
    if (leaf && nameList.length === 1) {
      rootNode.children[childIndex].leaves.push(leaf);
    } else {
      setNodeInChildren(nameList.slice(1), rootNode.children[childIndex], leaf);
    }
  }
};

export const constructTree = (
  dialogues: Array<ReplayDialogueType>,
  diagToKeywords = (diag: ReplayDialogueType) => diag.question_keywords,
  addLeaf: boolean = false,
): KeywordTreeNodeType<KeywordTreeLeafType> => {
  let tree = new Object({
    name: 'Root',
    children: [],
    leaves: [],
  }) as KeywordTreeNodeType<KeywordTreeLeafType>;
  dialogues.forEach(dialogue => {
    setNodeInChildren(diagToKeywords(dialogue), tree, addLeaf ? {
      id: dialogue.id,
      good: dialogue.good,
      true: dialogue.true,
      question: dialogue.question,
      answer: dialogue.answer,
      milestones: dialogue.milestones,
      dependency: dialogue.dependency,
    } : null);
  });
  return tree;
};
