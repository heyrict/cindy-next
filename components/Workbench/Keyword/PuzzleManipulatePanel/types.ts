import { KeywordTreeNodeType } from '../types';
import { ReplayDialogueType, MilestoneType } from 'reducers/types';

export type PuzzleManipulatePanelProps = {
  tree: KeywordTreeNodeType;
};

export type ReplayMetaEditProps = {
  title: string;
  setTitle: (title: string) => void;
};

export type ReplaySubmitButtonProps = {
  puzzleId: number;
  title: string;
  replayDialogues: Array<ReplayDialogueType>;
  milestones: Array<MilestoneType>;
};
