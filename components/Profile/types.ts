import { QueryResult } from '@apollo/react-common';
import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';
import { GlobalUserType } from 'reducers/types';

type Award = {
  __typename: 'sui_hei_award';
  id: number;
  name: string;
  description: string;
};

type UserAward = {
  __typename: 'sui_hei_useraward';
  id: number;
  created: any;
  sui_hei_award: Award;
};

type PuzzlesAggregateAggregate = {
  __typename: 'sui_hei_puzzle_aggregate_fields';
  count: number | null;
};
type PuzzlesAggregate = {
  __typename: 'sui_hei_puzzle_aggregate';
  aggregate: PuzzlesAggregateAggregate | null;
};

type DialoguesAggregateAggregate = {
  __typename: 'sui_hei_dialogue_aggregate_fields';
  count: number | null;
};
type DialoguesAggregate = {
  __typename: 'sui_hei_dialogue_aggregate';
  aggregate: DialoguesAggregateAggregate | null;
};

type CommentsAggregateAggregate = {
  __typename: 'sui_hei_comment_aggregate_fields';
  count: number | null;
};
type CommentsAggregate = {
  __typename: 'sui_hei_comment_aggregate';
  aggregate: CommentsAggregateAggregate | null;
};

type StarsAggregateAggregateSum = {
  __typename: 'sui_hei_star_sum_fields';
  value: number;
};
type StarsAggregateAggregate = {
  __typename: 'sui_hei_star_aggregate_fields';
  count: number | null;
  sum: StarsAggregateAggregateSum | null;
};
type StarsAggregate = {
  __typename: 'sui_hei_star_aggregate';
  aggregate: StarsAggregateAggregate | null;
};

export type ProfileUserType = {
  id: number;
  profile: string;
  nickname: string;
  username: string;
  date_joined: string;
  last_login?: string;
  sui_hei_userawards: Array<UserAward>;
  sui_hei_current_useraward?: UserAward | null;
  sui_hei_puzzles_aggregate?: PuzzlesAggregate | null;
  sui_hei_dialogues_aggregate?: DialoguesAggregate | null;
  good_questions_aggregate?: DialoguesAggregate | null;
  true_answers_aggregate?: DialoguesAggregate | null;
  sui_hei_comments_aggregate?: CommentsAggregate | null;
  received_comments_aggregate?: CommentsAggregate | null;
  sui_hei_stars_aggregate?: StarsAggregate | null;
  received_stars_aggregate?: StarsAggregate | null;
};

export type ProfileInfoRendererProps = {
  currentUser: GlobalUserType;
  directChatWithUser: (userId: number) => void;
} & QueryResult<UserQuery, UserQueryVariables>;

export type ProfileInfoProps = {
  user: ProfileUserType;
};

export type ProfileProps = {
  userId: number;
};

export enum ProfileTabType {
  INFO,
  FOOTPRINTS,
  PUZZLES,
  STARS,
  COMMENTS,
  BOOKMARKS,
}

export type ProfileSubbarProps = {
  tab: ProfileTabType;
  setTab: (tab: ProfileTabType) => void;
  hideBookmark: boolean;
};
