import { GlobalUserType } from 'reducers/types';

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
  setMode: (mode: symbol) => any;
  puzzleStatus: number;
};

export type AnswerModeSelectorProps = {
  dialogueId: number;
  answer: string;
  answerEditTimes: number;
  trueAns: boolean;
  goodAns: boolean;
  puzzleStatus: number;
};

export type PuzzleDialogueAnswerProps = {
  dialogueId: number;
  user: GlobalUserType;
  puzzleUserId: number;
  puzzleStatus: number;
  answer: string;
  answerEditTimes: number;
  goodAns: boolean;
  trueAns: boolean;
};
