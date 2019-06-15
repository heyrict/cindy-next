import { MutationFn } from 'react-apollo';
import {
  UpdatePuzzleMutation,
  UpdatePuzzleMutationVariables,
} from 'graphql/Mutations/generated/UpdatePuzzleMutation';
import { PuzzleType } from '../types';

export enum ControlPanelPanelType {
  SOLUTION_EDIT,
  MEMO_EDIT,
  HINT_ADD,
  PUZZLE_EDIT,
}

export type ControlPanelProps = {
  puzzle: PuzzleType;
};

export type SetPanelToolbarProps = {
  currentPanel: ControlPanelPanelType;
  setCurrentPanel: (panel: ControlPanelPanelType) => void;
  status: number;
};

export type SolutionEditPanelProps = {
  puzzleId: number;
  solution: string;
};

export type MemoEditPanelProps = {
  puzzleId: number;
  memo: string;
};

export type HintAddPanelProps = {
  puzzleId: number;
  yami: number;
};

export type PuzzleEditPanelProps = {
  updatePuzzle: MutationFn<UpdatePuzzleMutation, UpdatePuzzleMutationVariables>;
  puzzleId: number;
  yami: number;
  genre: number;
  grotesque: boolean;
  status: number;
  dazed_on: string;
  show?: boolean;
};

export type ParticipantSelectorProps = {
  value: number | null;
  setValue: (value: number) => void;
};
