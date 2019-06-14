import { InlineUser } from 'components/User/types';
import { QueryResult } from 'react-apollo';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';

export type DialogueType = {
  id: number;
  question: string;
  answer: string;
  good: boolean;
  true: boolean;
  questionEditTimes: number;
  answerEditTimes: number;
  created: string;
  answeredtime?: string;
  sui_hei_user: InlineUser;
};

export type PuzzleDialogueProps = {
  index?: number;
  dialogue: DialogueType;
  puzzleUser: InlineUser;
  puzzleStatus: number;
};

export type PuzzleDialoguesProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  puzzleYami: number;
  userId?: number;
  anonymous: boolean;
};

export type PuzzleDialoguesUserDeduplicatorProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  userId?: number;
  anonymous: boolean;
  shouldSubscribe: boolean;
};

export type PuzzleDialoguesRendererProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  anonymous: boolean;
  shouldSubscribe: boolean;
} & QueryResult<DialogueHintQuery, DialogueHintQueryVariables>;

export type FilterButtonProps = {
  accent: boolean;
  active: boolean;
};

export type UserFilterSwitcherUserType = {
  id: number;
  nickname: string;
  dialogueCount?: number;
  dialogueUnsolvedCount?: number;
  dialogueHasTrue?: boolean;
};

export const UserFilterSwitcherDefaltProps = {
  onClick: (_userId: number): void => {},
};

export type UserFilterSwitcherProps = {
  users: Array<UserFilterSwitcherUserType>;
  activeUserId?: number;
} & typeof UserFilterSwitcherDefaltProps;
