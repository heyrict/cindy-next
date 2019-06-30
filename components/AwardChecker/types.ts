import { GlobalUserType } from 'reducers/types';

export type AwardCheckerProps = {
  user: GlobalUserType;
  setPuzzles: (value: number) => void;
  setGoodQuestions: (value: number) => void;
  setTrueAnswers: (value: number) => void;
  setDialogues: (value: number) => void;
  setComments: (value: number) => void;
  setStars: (value: number) => void;
};

export type CheckNotifierProps = {
  puzzles: number;
  goodQuestions: number;
  trueAnswers: number;
  dialogues: number;
};
