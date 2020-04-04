import {
  ReplayQuery,
  ReplayQueryVariables,
  ReplayQuery_sui_hei_replay_by_pk,
} from 'graphql/Queries/generated/ReplayQuery';
import { QueryResult } from '@apollo/react-common';

export type ReplayRendererProps = {
  formatMessage: any;
} & QueryResult<ReplayQuery, ReplayQueryVariables>;

export type ReplayDetailProps = {
  replay: ReplayQuery_sui_hei_replay_by_pk;
};
