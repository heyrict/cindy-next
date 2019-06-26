import * as bool from './helpers/bool';
import { StateType, ActionContentType } from './types';

export const scope = 'setting';

export const actionTypes = {
  PUZZLE_GENRE_IMG: `${scope}.PUZZLE_GENRE_IMG`,
};

export const actions = {
  ...bool.getActions('PuzzleGenreImg', actionTypes.PUZZLE_GENRE_IMG),
};

export const rootSelector = (state: StateType) => state[scope];

export const initialState = {
  puzzleGenreImg: true,
};

export const reducer = (state = initialState, action: ActionContentType) => {
  switch (action.type) {
    case actionTypes.PUZZLE_GENRE_IMG:
      return {
        ...state,
        puzzleGenreImg: bool.helper(state.puzzleGenreImg, action.payload),
      };
    default:
      return state;
  }
};
