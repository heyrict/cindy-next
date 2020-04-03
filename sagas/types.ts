import { ReplayDialogueType } from 'reducers/types';

export type HashStoreType<T> = {
  [key: number]: T;
};

export type MemoStatStoreType = HashStoreType<number>;
export type ChatStoreType = HashStoreType<number>;
export type ReplaySavedStoreType = HashStoreType<ReplayDialogueType[]>;
