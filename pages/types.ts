import { QueryResult } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import { PuzzlesUnsolvedLiveQuery } from 'graphql/LiveQueries/generated/PuzzlesUnsolvedLiveQuery';

export type PuzzleProps = {
  puzzleId: number;
};

export type PuzzlesSolvedRendererProps = QueryResult<
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables
>;

export type PuzzlesUnsolvedRendererProps = {
  loading: boolean;
  data?: PuzzlesUnsolvedLiveQuery | undefined;
  error?: ApolloError | undefined;
};

export type UserPageProps = {
  userId: number;
};
