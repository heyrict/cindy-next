import * as integer from './helpers/integer';
import { StateType, ActionContentType, ValueOf } from './types';

export const scope = 'awardChecker';

export enum actionTypes {
  INIT = 'awardChecker.INIT',
  PUZZLES = 'awardChecker.PUZZLES',
  GOOD_QUESTIONS = 'awardChecker.GOOD_QUESTIONS',
  TRUE_ANSWERS = 'awardChecker.TRUE_ANSWERS',
  DIALOGUES = 'awardChecker.DIALOGUES',
}

export type ActionPayloadType = {
  INIT: {
    state: Partial<typeof initialState>;
  };
  PUZZLES: ReturnType<ValueOf<integer.HelperActionType>>;
  GOOD_QUESTIONS: ReturnType<ValueOf<integer.HelperActionType>>;
  TRUE_ANSWERS: ReturnType<ValueOf<integer.HelperActionType>>;
  DIALOGUES: ReturnType<ValueOf<integer.HelperActionType>>;
};

export const actions = {
  puzzles: integer.wrapActions(actionTypes.PUZZLES),
  goodQuestions: integer.wrapActions(actionTypes.GOOD_QUESTIONS),
  trueAnswers: integer.wrapActions(actionTypes.TRUE_ANSWERS),
  dialogues: integer.wrapActions(actionTypes.DIALOGUES),
  initialize: (state: typeof initialState) =>
    ({
      type: actionTypes.INIT,
      payload: {
        state,
      },
    } as const),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  puzzles: -1,
  goodQuestions: -1,
  trueAnswers: -1,
  dialogues: -1,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        ...action.payload.state,
      };
    case actionTypes.PUZZLES:
      return {
        ...state,
        puzzles: integer.helper(state.puzzles, action.payload),
      };
    case actionTypes.GOOD_QUESTIONS:
      return {
        ...state,
        goodQuestions: integer.helper(state.goodQuestions, action.payload),
      };
    case actionTypes.TRUE_ANSWERS:
      return {
        ...state,
        trueAnswers: integer.helper(state.trueAnswers, action.payload),
      };
    case actionTypes.DIALOGUES:
      return {
        ...state,
        dialogues: integer.helper(state.dialogues, action.payload),
      };
    default:
      return state;
  }
};
