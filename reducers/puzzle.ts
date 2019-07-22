import * as array from './helpers/array';
import * as base from './helpers/base';
import * as bool from './helpers/bool';
import { StateType, ActionContentType, RightAsideType, ValueOf } from './types';
import { UserFilterSwitcherUserType } from 'components/Puzzle/Detail/PuzzleDialogues/types';

export const scope = 'puzzle';

export enum actionTypes {
  PARTICIPANTS = 'puzzle.PARTICIPANTS',
  PUZZLE_CONTENT = 'puzzle.PUZZLE_CONTENT',
  PUZZLE_MEMO = 'puzzle.PUZZLE_MEMO',
  PUZZLE_MEMO_HASNEW = 'puzzle.PUZZLE_MEMO_HASNEW',
  SOLVED_LONGTERM_YAMI = 'puzzle.SOLVED_LONGTERM_YAMI',
  RIGHT_ASIDE = 'puzzle.RIGHT_ASIDE',
}

export type ActionPayloadType = {
  PARTICIPANTS: ReturnType<
    ValueOf<array.HelperActionType<UserFilterSwitcherUserType>>
  >;
  PUZZLE_CONTENT: ReturnType<ValueOf<base.HelperActionType<string>>>;
  PUZZLE_MEMO: ReturnType<ValueOf<base.HelperActionType<string>>>;
  PUZZLE_MEMO_HASNEW: ReturnType<ValueOf<bool.HelperActionType>>;
  SOLVED_LONGTERM_YAMI: ReturnType<ValueOf<bool.HelperActionType>>;
  RIGHT_ASIDE: ReturnType<ValueOf<base.HelperActionType<RightAsideType>>>;
};

export const actions = {
  participants: array.wrapActions<UserFilterSwitcherUserType>(
    actionTypes.PARTICIPANTS,
  ),
  puzzleContent: base.wrapActions<string>(actionTypes.PUZZLE_CONTENT),
  puzzleMemo: base.wrapActions<string>(actionTypes.PUZZLE_MEMO),
  puzzleMemoHasnew: bool.wrapActions(actionTypes.PUZZLE_MEMO_HASNEW),
  solvedLongtermYami: bool.wrapActions(actionTypes.SOLVED_LONGTERM_YAMI),
  rightAside: base.wrapActions<RightAsideType>(actionTypes.RIGHT_ASIDE),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  participants: [] as Array<UserFilterSwitcherUserType>,
  puzzleContent: '',
  puzzleMemo: '',
  puzzleMemoHasnew: false,
  solvedLongtermYami: false,
  rightAside: RightAsideType.none,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
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
    case actionTypes.PUZZLE_MEMO_HASNEW:
      return {
        ...state,
        puzzleMemoHasnew: bool.helper(state.puzzleMemoHasnew, action.payload),
      };
    case actionTypes.SOLVED_LONGTERM_YAMI:
      return {
        ...state,
        solvedLongtermYami: bool.helper(
          state.solvedLongtermYami,
          action.payload,
        ),
      };
    case actionTypes.RIGHT_ASIDE:
      return {
        ...state,
        rightAside: base.helper(state.rightAside, action.payload),
      };
    default:
      return state;
  }
};
