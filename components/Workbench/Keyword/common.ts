import { ReplayKeywordsType, ReplayDialogueType } from 'reducers/types';
import { KeywordTreeNodeType } from './types';

export const counter = async (
  list: Array<string>,
  continueFrom?: ReplayKeywordsType,
): Promise<ReplayKeywordsType> => {
  const counts = continueFrom || (new Object() as ReplayKeywordsType);
  list.forEach(v => {
    if (v in counts) counts[v].count += 1;
    else
      counts[v] = {
        count: 1,
        use: false,
      };
  });
  return counts;
};

export const setNodeInChildren = (
  nameList: Array<string>,
  rootNode: KeywordTreeNodeType,
): void => {
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
  keywords: ReplayKeywordsType,
): Array<ReplayDialogueType> =>
  dialogues.map(dialogue => ({
    ...dialogue,
    question_keywords: dialogue.question_keywords
      .filter(keyword => keywords[keyword] && keywords[keyword].use === true)
      .concat(dialogue.question),
  }));
