import { ReplayDialogueType, MilestoneType } from 'reducers/types';

export type DependencyManipulatePanelProps = {
  replayDialogueIds: Array<number>;
};

export type DependencyManipulateProps = {
  dialogueId: number;
  dialogue: ReplayDialogueType;
  milestones: Array<MilestoneType>;
  updateDialogue: (
    update: (dialogue: ReplayDialogueType) => ReplayDialogueType,
  ) => void;
};

export type MilestoneLabelProps = {
  milestone: MilestoneType;
};
