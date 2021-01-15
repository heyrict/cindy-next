import { InlineUser } from 'components/User/types';
import { DialogueShared } from 'graphql/Fragments/generated/DialogueShared';
import { GlobalUserType } from 'reducers/types';
import {
  DialogueHintQueryVariables,
  DialogueHintQuery_puzzleLogs,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { Yami, Status } from 'generated/globalTypes';

export type PuzzleDialogueProps = {
  index?: number;
  dialogue: DialogueShared;
  puzzleUser: InlineUser;
  puzzleStatus: Status;
  anonymous: boolean;
};

export type PuzzleDialoguesProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: Status;
  puzzleYami: Yami;
  userId?: number;
  anonymous: boolean;
  setTrueSolvedLongtermYami: () => void;
};

export type PuzzleDialoguesUserDeduplicatorProps = {
  puzzleId: number;
  puzzleUser: InlineUser;
  puzzleStatus: Status;
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
  puzzleStatus: Status;
  puzzleYami: Yami;
  variables: DialogueHintQueryVariables;
  anonymous: boolean;
  shouldSubscribe: boolean;
  pushNotification: boolean;
  setTrueSolvedLongtermYami: () => void;
  setParticipants: (participants: Array<UserFilterSwitcherUserType>) => void;
  user: GlobalUserType;
  incGoodQuestions: (value?: number) => void;
  incTrueAnswers: (value?: number) => void;
} & typeof PuzzleDialoguesRendererDefaultProps;

export type PuzzleDialoguesRendererInnerProps = {
  puzzleLogs: Array<DialogueHintQuery_puzzleLogs>;
  puzzleUser: InlineUser;
  puzzleStatus: Status;
  anonymous: boolean;
};

export type FilterButtonProps = {
  accent: boolean;
  active: boolean;
};

export type UserFilterSwitcherUserType = {
  id: number;
  nickname: string;
  dialogueCount: number;
  answeredDialogueCount: number;
  trueAnswer: boolean;
};

export type ExtractUserFilterUserReturnType = {
  id: number;
  nickname: string;
  dialogueCount: number;
  answeredDialogueCount: number;
  trueAnswer: boolean;
};

export const UserFilterSwitcherDefaltProps = {
  onClick: (_userId: number): void => {},
};

export type UserFilterSwitcherProps = {
  users: Array<UserFilterSwitcherUserType>;
  activeUserId?: number;
} & typeof UserFilterSwitcherDefaltProps;
