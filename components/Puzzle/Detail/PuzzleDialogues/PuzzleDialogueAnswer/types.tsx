import { GlobalUserType } from 'reducers/types';
import { Status } from 'generated/globalTypes';

export type AnswerDisplayProps = {
  answer: string;
  answerEditTimes: number;
  trueAns: boolean;
  goodAns: boolean;
};

export type AnswerEditProps = {
  answer: string;
  trueAns: boolean;
  goodAns: boolean;
  dialogueId: number;
  answeredTime?: string | null;
  setMode: (mode: symbol) => any;
  puzzleStatus: Status;
  sendAnswerTrigger: number;
};

export type AnswerModeSelectorProps = {
  dialogueId: number;
  answer: string;
  answerEditTimes: number;
  answeredTime?: string | null;
  trueAns: boolean;
  goodAns: boolean;
  puzzleStatus: Status;
};

export type PuzzleDialogueAnswerProps = {
  dialogueId: number;
  user: GlobalUserType;
  puzzleUserId: number;
  puzzleStatus: Status;
  answer: string;
  answerEditTimes: number;
  answeredTime?: string | null;
  goodAns: boolean;
  trueAns: boolean;
};
