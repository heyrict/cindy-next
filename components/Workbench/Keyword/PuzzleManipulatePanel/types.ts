import { KeywordTreeNodeType } from '../types';

export type PuzzleManipulatePanelProps = {
  tree: KeywordTreeNodeType;
};

export type ReplayMetaEditProps = {
  title: string;
  setTitle: (title: string) => void;
};
