import {
  ReplayQuery,
  ReplayQueryVariables,
  ReplayQuery_sui_hei_replay_by_pk,
  ReplayQuery_sui_hei_replay_by_pk_sui_hei_replay_dialogues,
} from 'graphql/Queries/generated/ReplayQuery';
import { QueryResult } from '@apollo/react-common';
import { ReplayDialogueType } from 'reducers/types';

export type ReplayRendererProps = {
  formatMessage: any;
} & QueryResult<ReplayQuery, ReplayQueryVariables>;

export type ReplayDetailProps = {
  replay: ReplayQuery_sui_hei_replay_by_pk;
  constructTree: (dialogues: Array<ReplayDialogueType>) => void;
};

export type ReplayLogsProps = {
  dialogues: Array<ReplayQuery_sui_hei_replay_by_pk_sui_hei_replay_dialogues>;
  logs: Array<number>;
};

export type ReplayLogProps = {
  dialogue?: ReplayQuery_sui_hei_replay_by_pk_sui_hei_replay_dialogues;
  qno: number;
};
