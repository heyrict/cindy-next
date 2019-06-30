import * as integer from './helpers/integer';
import { StateType, ActionContentType, ActionSetType } from './types';

export const scope = 'awardChecker';

export const actionTypes = {
  PUZZLES: `${scope}.PUZZLES`,
  GOOD_QUESTIONS: `${scope}.GOOD_QUESTIONS`,
  TRUE_ANSWERS: `${scope}.TRUE_ANSWERS`,
  DIALOGUES: `${scope}.DIALOGUES`,
};

export const actions: ActionSetType = {
  ...integer.getActions('Puzzles', actionTypes.PUZZLES),
  ...integer.getActions('GoodQuestions', actionTypes.GOOD_QUESTIONS),
  ...integer.getActions('TrueAnswers', actionTypes.TRUE_ANSWERS),
  ...integer.getActions('Dialogues', actionTypes.DIALOGUES),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  puzzles: 0,
  goodQuestions: 0,
  trueAnswers: 0,
  dialogues: 0,
};

export const reducer = (
  state = initialState,
  action: ActionContentType,
): typeof initialState => {
  switch (action.type) {
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
