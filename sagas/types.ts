import { ReplayDialogueType, MilestoneType } from 'reducers/types';

export type HashStoreType<T> = {
  [key: number]: T;
};

export type ReplayStorage = {
  title: string;
  content: string;
  solution: string;
  milestones: MilestoneType[];
  dialogues: ReplayDialogueType[];
};

export type MemoStatStoreType = HashStoreType<number>;
export type ChatStoreType = HashStoreType<number>;
export type ReplaySavedStoreType = HashStoreType<ReplayStorage>;
