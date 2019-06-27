import { QueryResult } from 'react-apollo';
import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';
import {
  UserDialogueRankingQuery,
  UserDialogueRankingQueryVariables,
} from 'graphql/Queries/generated/UserDialogueRankingQuery';

export const PuzzleStarRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type PuzzleStarRankingRendererProps = typeof PuzzleStarRankingRendererDefaultProps &
  QueryResult<PuzzleStarRankingQuery, PuzzleStarRankingQueryVariables>;

export const UserDialogueRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type UserDialogueRankingRendererProps = typeof UserDialogueRankingRendererDefaultProps &
  QueryResult<UserDialogueRankingQuery, UserDialogueRankingQueryVariables>;
