import { InlineUser } from 'components/User/types';

export type DialogueType = {
  id: number;
  question: string;
  answer: string;
  good: boolean
  true: boolean
  questionEditTimes: number;
  answerEditTimes: number;
  created: string;
  answeredtime?: string;
  sui_hei_user: InlineUser;
};

export type PuzzleDialogueProps = {
  dialogue: DialogueType;
  puzzleUser: InlineUser;
  puzzleStatus: number;
};

export type PuzzleDialoguesProps = {
  puzzleId: number;
  puzzleUser: object;
  puzzleStatus: number;
  userId?: number;
  anonymous: boolean;
};
