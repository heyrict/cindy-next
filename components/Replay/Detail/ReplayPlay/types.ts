import { KeywordTreeLeafType } from 'components/Workbench/Keyword/types';
import { MilestoneType } from 'reducers/types';

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
  milestones: Array<MilestoneType>;
};

export type ReplayLeafSelectProps = {
  leaves?: Array<KeywordTreeLeafType>;
  pushClues: (clues: Array<string>) => void;
  pushLog: (log: number) => void;
  clearPath: () => void;
};

export type ReplayCluesDisplayProps = {
  milestones: Array<MilestoneType>;
  clues: Array<string>;
};

export type ClueDisplayProps = {
  milestone: MilestoneType;
};
