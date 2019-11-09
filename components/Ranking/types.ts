import { QueryResult } from '@apollo/react-common';
import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';
import {
  UserDialogueRankingQuery,
  UserDialogueRankingQueryVariables,
} from 'graphql/Queries/generated/UserDialogueRankingQuery';
import {
  UserPuzzleRankingQuery,
  UserPuzzleRankingQueryVariables,
} from 'graphql/Queries/generated/UserPuzzleRankingQuery';

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

export const UserPuzzleRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type UserPuzzleRankingRendererProps = typeof UserPuzzleRankingRendererDefaultProps &
  QueryResult<UserPuzzleRankingQuery, UserPuzzleRankingQueryVariables>;
