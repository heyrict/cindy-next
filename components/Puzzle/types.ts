import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';
import { QueryResult } from 'react-apollo';
import { PuzzleType } from './Brief/types';

export type PuzzleRendererProps = {
  formatMessage: any;
  puzzleId: number;
} & QueryResult<PuzzleQuery, PuzzleQueryVariables>;

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
