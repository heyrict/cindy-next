import { ReplayDialogueType } from 'reducers/types';

export type KeywordWorkbenchProps = {
  id: number;
  setReplayDialogues: (data: Array<ReplayDialogueType>) => void;
  setKuromojiProgress: (percentage: number) => void;
  setCountFilterInput: (value: number) => void;
};

export type KuromojiProgressProps = {
  progress: number;
};

export type KeywordTreeNodeType = {
  name: string;
  children: Array<KeywordTreeNodeType>;
};

export type ResultPreviewProps = {
  keywordTree: KeywordTreeNodeType;
};
