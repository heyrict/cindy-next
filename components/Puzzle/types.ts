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
