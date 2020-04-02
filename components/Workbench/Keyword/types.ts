import { ReplayDialogueType, ReplayKeywordsType } from 'reducers/types';

export type KeywordWorkbenchProps = {
  id: number;
  setReplayDialogues: (data: Array<ReplayDialogueType>) => void;
  setKuromojiProgress: (percentage: number) => void;
  setCountFilterInput: (value: number) => void;
  setKeywords: (keywords: ReplayKeywordsType) => void;
};

export type KeywordTreeNodeType = {
  name: string;
  children: Array<KeywordTreeNodeType>;
};

export type ResultPreviewProps = {
  keywordTree: KeywordTreeNodeType;
};

export type KuromojiProgressProps = {
  progress: number;
};
