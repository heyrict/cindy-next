import * as array from './helpers/array';
import { StateType, ActionContentType, ActionSetType } from './types';
import { UserFilterSwitcherUserType } from 'components/Puzzle/Detail/PuzzleDialogues/types';

export const scope = 'puzzle';

export const actionTypes = {
  PARTICIPANTS: `${scope}.PARTICIPANTS`,
};

export const actions: ActionSetType = {
  ...array.getActions('Participants', actionTypes.PARTICIPANTS),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  participants: [] as Array<UserFilterSwitcherUserType>,
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
    default:
      return state;
  }
};
