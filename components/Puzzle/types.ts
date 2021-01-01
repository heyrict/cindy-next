import { PuzzleType } from './Brief/types';
import { CommentDetail } from 'graphql/Fragments/generated/CommentDetail';

export type PuzzleRendererProps = {
  puzzleId: number;
  formatMessage: any;
  pushNotification: boolean;
};

export enum RankedPuzzleDisplayType {
  star,
  comment,
  bookmark,
}

export type RankedPuzzleProps = {
  puzzle: PuzzleType;
  showGenreImage: boolean;
  rank: number;
  display: RankedPuzzleDisplayType;
};

export type PuzzleWithAnyProps = {
  puzzle: PuzzleType;
  cap?: React.ReactNode;
  bookmarkCount?: number;
  commentCount?: number;
  starCount?: number;
  starSum?: number;
  dialogueCount?: number;
  dialogueMaxAnsweredtime?: string;
  dialogueMaxCreated?: string;
  showGenreImage: boolean;
};

export type CommentContentProps = {
  on: boolean;
};

export type CommentDisplayProps = {
  comment: CommentDetail;
};

export type CommentDisplayStates = {
  on: boolean;
};
