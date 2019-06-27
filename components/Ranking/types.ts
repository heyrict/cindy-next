import { QueryResult } from 'react-apollo';
import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';

export type PuzzleStarRankingRendererProps = QueryResult<
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables
>;
