import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';
import { QueryResult } from 'react-apollo';

export type PuzzleRendererProps = {
  formatMessage: any;
  puzzleId: number;
} & QueryResult<PuzzleQuery, PuzzleQueryVariables>;
