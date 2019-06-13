import { GlobalUserType } from 'reducers/types';

export type QuestionDisplayProps = {
  question: string;
  questionEditTimes: number;
};

export type QuestionEditProps = {
  question: string;
  dialogueId: number;
  setMode: (mode: symbol) => any;
};

export type QuestionModeSelectorProps = {
  question: string,
  questionEditTimes: number,
  dialogueId: number,
};

export type PuzzleDialogueQuestionProps = {
  dialogueId: number;
  user: GlobalUserType;
  userId: number;
  question: string;
  questionEditTimes: number;
  puzzleStatus: number;
};
