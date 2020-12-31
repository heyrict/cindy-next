import { QueryResult } from '@apollo/react-common';
import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';
import { GlobalUserType } from 'reducers/types';

type Award = {
  __typename: 'award';
  id: number;
  name: string;
  description: string;
};

type UserAward = {
  __typename: 'user_award';
  id: number;
  created: any;
  award: Award;
};

type PuzzlesAggregateAggregate = {
  __typename: 'puzzle_aggregate_fields';
  count: number | null;
};
type PuzzlesAggregate = {
  __typename: 'puzzle_aggregate';
  aggregate: PuzzlesAggregateAggregate | null;
};

type DialoguesAggregateAggregate = {
  __typename: 'dialogue_aggregate_fields';
  count: number | null;
};
type DialoguesAggregate = {
  __typename: 'dialogue_aggregate';
  aggregate: DialoguesAggregateAggregate | null;
};

type CommentsAggregateAggregate = {
  __typename: 'comment_aggregate_fields';
  count: number | null;
};
type CommentsAggregate = {
  __typename: 'comment_aggregate';
  aggregate: CommentsAggregateAggregate | null;
};

type StarsAggregateAggregateSum = {
  __typename: 'star_sum_fields';
  value: number;
};
type StarsAggregateAggregate = {
  __typename: 'star_aggregate_fields';
  count: number | null;
  sum: StarsAggregateAggregateSum | null;
};
type StarsAggregate = {
  __typename: 'star_aggregate';
  aggregate: StarsAggregateAggregate | null;
};

export type ProfileUserType = {
  id: number;
  profile: string;
  nickname: string;
  username: string;
  dateJoined: string;
  lastLogin?: string;
  userAwards: Array<UserAward>;
  currentAward?: UserAward | null;
  puzzles_aggregate?: PuzzlesAggregate | null;
  dialogues_aggregate?: DialoguesAggregate | null;
  good_questions_aggregate?: DialoguesAggregate | null;
  true_answers_aggregate?: DialoguesAggregate | null;
  comments_aggregate?: CommentsAggregate | null;
  received_comments_aggregate?: CommentsAggregate | null;
  stars_aggregate?: StarsAggregate | null;
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
