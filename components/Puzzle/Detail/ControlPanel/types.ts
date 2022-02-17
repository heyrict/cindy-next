import { PuzzleTypeWithSolution } from '../types';
import { Genre, Status, Yami } from 'generated/globalTypes';

export enum ControlPanelPanelType {
  SOLUTION_EDIT,
  MEMO_EDIT,
  HINT_ADD,
  PUZZLE_EDIT,
}

export type ControlPanelProps = {
  puzzle: PuzzleTypeWithSolution;
};

export type SetPanelToolbarProps = {
  currentPanel: ControlPanelPanelType;
  setCurrentPanel: (panel: ControlPanelPanelType) => void;
  status: Status;
};

export type SolutionEditPanelProps = {
  puzzleId: number;
  userId: number | null;
  solution: string;
  status: Status;
  yami: Yami;
};

export type MemoEditPanelProps = {
  puzzleId: number;
  memo: string;
};

export type HintAddPanelProps = {
  puzzleId: number;
  yami: Yami;
};

export type PuzzleEditPanelProps = {
  puzzleId: number;
  yami: Yami;
  genre: Genre;
  grotesque: boolean;
  status: Status;
  dazedOn: string;
  show?: boolean;
};

export type ParticipantSelectorProps = {
  value: number | null;
  setValue: (value: number | null) => void;
};
