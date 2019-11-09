import { IntlShape } from 'react-intl';
import * as settingReducer from 'reducers/setting';

import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import {
  sui_hei_puzzle_order_by,
  sui_hei_tag_order_by,
} from 'generated/globalTypes';
import {
  CommentsQuery,
  CommentsQueryVariables,
} from 'graphql/Queries/generated/CommentsQuery';
import { GlobalUserType } from 'reducers/types';
import { PuzzlesUnsolvedQuery } from 'graphql/Queries/generated/PuzzlesUnsolvedQuery';
import { QueryResult } from '@apollo/react-common';

export type UserPageProps = {
  userId: number;
  intl: IntlShape;
};

export type PuzzlesSolvedRendererProps = QueryResult<
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables
>;

export type PuzzlesUnsolvedRendererProps = {
  intl: IntlShape;
} & QueryResult<PuzzlesUnsolvedQuery>;

export type SearchVariablesStates = {
  title: null | string;
  content: null | string;
  solution: null | string;
  userNickname: null | string;
  genre: null | number;
  yami: null | number;
  orderBy: Array<sui_hei_puzzle_order_by>;
};

export type RankingProps = {
  intl: IntlShape;
};

export type PuzzleProps = {
  puzzleId: number;
  intl: IntlShape;
};

export type AddReplayProps = {
  puzzleId: number;
  intl: IntlShape;
};

export type EULAProps = {
  language: typeof settingReducer.initialState.language;
  intl: IntlShape;
};

export type TagsVariablesStates = {
  name: null | string;
  orderBy: Array<sui_hei_tag_order_by>;
};

export type CommentsRendererProps = QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>;

export type ChannelPageProps = {
  chatroom: string;
  toggleAside: () => void;
  intl: IntlShape;
};

export type AddPuzzleProps = {
  user: GlobalUserType;
  intl: IntlShape;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};
