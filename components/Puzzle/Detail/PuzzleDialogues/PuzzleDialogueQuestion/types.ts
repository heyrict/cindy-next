import { GlobalUserType } from 'reducers/types';
import { Status } from 'generated/globalTypes';

export type QuestionDisplayProps = {
  question: string;
  questionEditTimes: number;
};

export type QuestionEditProps = {
  question: string;
  dialogueId: number;
  setMode: (mode: symbol) => any;
  editQuestionTrigger: number;
};

export type QuestionModeSelectorProps = {
  question: string;
  questionEditTimes: number;
  dialogueId: number;
};

export type PuzzleDialogueQuestionProps = {
  dialogueId: number;
  user: GlobalUserType;
  userId: number;
  question: string;
  questionEditTimes: number;
  puzzleStatus: Status;
  isAnswered: boolean;
};
