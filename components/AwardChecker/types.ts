import { GlobalUserType } from 'reducers/types';
import * as awardCheckerReducer from 'reducers/awardChecker';

export type AwardCheckerProps = {
  user: GlobalUserType;
  initAwardCount: (state: typeof awardCheckerReducer.initialState) => void;
};

export type CheckNotifierProps = {
  puzzles: number;
  goodQuestions: number;
  trueAnswers: number;
  dialogues: number;
};
