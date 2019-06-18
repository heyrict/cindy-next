import * as array from './helpers/array';
import * as base from './helpers/base';
import * as bool from './helpers/bool';
import { StateType, ActionContentType, ActionSetType } from './types';
import { UserFilterSwitcherUserType } from 'components/Puzzle/Detail/PuzzleDialogues/types';

export const scope = 'puzzle';

export const actionTypes = {
  PARTICIPANTS: `${scope}.PARTICIPANTS`,
  PUZZLE_CONTENT: `${scope}.PUZZLE_CONTENT',`,
  PUZZLE_MEMO: `${scope}.PUZZLE_MEMO',`,
  SOLVED_LONGTERM_YAMI: `${scope}.SOLVED_LONGTERM_YAMI`,
};

export const actions: ActionSetType = {
  ...array.getActions('Participants', actionTypes.PARTICIPANTS),
  ...base.getActions('PuzzleContent', actionTypes.PUZZLE_CONTENT),
  ...base.getActions('PuzzleMemo', actionTypes.PUZZLE_MEMO),
  ...bool.getActions('SolvedLongtermYami', actionTypes.SOLVED_LONGTERM_YAMI),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  participants: [] as Array<UserFilterSwitcherUserType>,
  puzzleContent: '',
  puzzleMemo: '',
  solvedLongtermYami: false,
};

export const reducer = (
  state = initialState,
  action: ActionContentType,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.PARTICIPANTS:
      return {
        ...state,
        participants: array.helper(state.participants, action.payload),
      };
    case actionTypes.PUZZLE_CONTENT:
      return {
        ...state,
        puzzleContent: base.helper(state.puzzleContent, action.payload),
      };
    case actionTypes.PUZZLE_MEMO:
      return {
        ...state,
        puzzleMemo: base.helper(state.puzzleMemo, action.payload),
      };
    case actionTypes.SOLVED_LONGTERM_YAMI:
      return {
        ...state,
        solvedLongtermYami: bool.helper(
          state.solvedLongtermYami,
          action.payload,
        ),
      };
    default:
      return state;
  }
};
