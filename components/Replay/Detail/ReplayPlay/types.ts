import { KeywordTreeLeafType } from 'components/Workbench/Keyword/types';

export type ReplayPathSelectProps = {
  path: Array<string>;
  setPath: (path: Array<string>) => void;
};

export type ReplayKeywordSelectProps = {
  keywords?: Array<string>;
  pushKeyword: (keyword: string) => void;
};

export type ReplayPlayProps = {
  treeLoaded: boolean;
};

export type ReplayLeafSelectProps = {
  leaves?: Array<KeywordTreeLeafType>;
  pushClues: (clues: Array<string>) => void;
  pushLog: (log: number) => void;
  clearPath: () => void;
};
