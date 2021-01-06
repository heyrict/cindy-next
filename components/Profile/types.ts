import { QueryResult } from '@apollo/client';
import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';
import { GlobalUserType } from 'reducers/types';

type Award = {
  __typename: 'Award';
  id: number;
  name: string;
  description: string;
};

type UserAward = {
  __typename: 'UserAward';
  id: number;
  created: any;
  award: Award;
};

export type ProfileUserType = {
  id: number;
  profile: string;
  nickname: string;
  username: string;
  dateJoined: string;
  lastLogin: string | null;
  userAwards: Array<UserAward>;
  currentAward?: UserAward | null;
  puzzleCount: number;
  goodQuestionCount: number;
  trueAnswerCount: number;
  dialogueCount: number;
  commentCount: number;
  starCount: number;
  starSum: number | null;
  receivedCommentCount: number;
  receivedStarCount: number;
  receivedStarSum: number | null;
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
  currentUser: GlobalUserType;
  directChatWithUser: (userId: number) => void;
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
