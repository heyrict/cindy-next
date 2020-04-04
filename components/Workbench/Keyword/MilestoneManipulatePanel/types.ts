import { ReplayDialogueType, MilestoneType } from 'reducers/types';

export type MilestonesManipulatePanelProps = {
  replayDialogueIds: Array<number>;
};

export type MilestonesManipulateProps = {
  dialogueId: number;
  dialogue: ReplayDialogueType;
  updateDialogue: (
    dialogueId: number,
    update: (dialogue: ReplayDialogueType) => ReplayDialogueType,
  ) => void;
};

export type MilestonesManagerProps = {
  milestones: Array<MilestoneType>;
  addMilestone: (handle: string, name: string, description: string) => void;
  removeMilestone: (handle: string) => void;
  editMilestone: (handle: string, name: string, description: string) => void;
};

export type MilestoneEditProps = {
  milestone?: MilestoneType;
  addMilestone: (handle: string, name: string, description: string) => void;
  removeMilestone: (handle: string) => void;
  editMilestone: (handle: string, name: string, description: string) => void;
};

export enum MilestoneEditMode {
  EDIT,
  ADD,
}
