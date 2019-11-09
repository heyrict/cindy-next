import { InlineUser } from 'components/User/types';
import { QueryResult } from '@apollo/react-common';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
  DialogueHintQuery_sui_hei_hint,
  DialogueHintQuery_sui_hei_dialogue,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { DialogueShared } from 'graphql/Fragments/generated/DialogueShared';
import { GlobalUserType } from 'reducers/types';

export type PuzzleDialogueProps = {
  index?: number;
  dialogue: DialogueShared;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  anonymous: boolean;
};

export type PuzzleDialoguesProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  puzzleYami: number;
  userId?: number;
  anonymous: boolean;
  setTrueSolvedLongtermYami: () => void;
};

export type PuzzleDialoguesUserDeduplicatorProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  userId?: number;
  anonymous: boolean;
  shouldSubscribe: boolean;
};

export const PuzzleDialoguesRendererDefaultProps = {
  applyUserFilter: false,
  updateSolvedLongTermYamiOnSubscribe: false,
};

export type PuzzleDialoguesRendererProps = {
  puzzleUser: InlineUser;
  puzzleStatus: number;
  anonymous: boolean;
  shouldSubscribe: boolean;
  pushNotification: boolean;
  setTrueSolvedLongtermYami: () => void;
  setParticipants: (participants: Array<UserFilterSwitcherUserType>) => void;
  user: GlobalUserType;
  incGoodQuestions: (value?: number) => void;
  incTrueAnswers: (value?: number) => void;
} & QueryResult<DialogueHintQuery, DialogueHintQueryVariables> &
  typeof PuzzleDialoguesRendererDefaultProps;

export type PuzzleDialoguesRendererInnerProps = {
  dialogues: Array<DialogueHintQuery_sui_hei_dialogue>;
  hints: Array<DialogueHintQuery_sui_hei_hint>;
  puzzleUser: InlineUser;
  puzzleStatus: number;
  anonymous: boolean;
};

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

export type ExtractUserFilterUserReturnType = {
  id: number;
  nickname: string;
  dialogueCount: number;
  dialogueUnsolvedCount: number;
  dialogueHasTrue: boolean;
};

export const UserFilterSwitcherDefaltProps = {
  onClick: (_userId: number): void => {},
};

export type UserFilterSwitcherProps = {
  users: Array<UserFilterSwitcherUserType>;
  activeUserId?: number;
} & typeof UserFilterSwitcherDefaltProps;
