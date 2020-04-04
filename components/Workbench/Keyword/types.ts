import { ReplayDialogueType, AddReplayModeType } from 'reducers/types';

export type KeywordWorkbenchProps = {
  id: number;
  setReplayDialogues: (data: Array<ReplayDialogueType>) => void;
  setKuromojiProgress: (percentage: number) => void;
  setCountFilterInput: (value: number) => void;
  setTitle: (title: string) => void;
  loadStorage: (id: number, init: () => Promise<any>) => void;
  saveStorage: (id: number) => void;
};

export type KeywordTreeLeafType = {
  id: number;
  question: string;
  answer: string;
  good: boolean;
  true: boolean;
  milestones: Array<string>;
  dependency: string;
};

export type KeywordTreeNodeType<T> = {
  name: string;
  children: Array<KeywordTreeNodeType>;
  leaves: Array<T>;
};

export type ResultPreviewProps = {
  keywordTree: KeywordTreeNodeType;
};

export type ChooseModeToolbarProps = {
  mode: AddReplayModeType;
  setMode: (mode: AddReplayModeType) => void;
};

export type ModeSelectPanelProps = {
  mode: AddReplayModeType;
};

export type KuromojiProgressProps = {
  progress: number;
};
