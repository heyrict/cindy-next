import * as bool from './helpers/bool';
import * as string from './helpers/string';

export const scope = 'global';

export const actionTypes = {
  ASIDE: `${scope}.ASIDE`,
  CHANNEL: `${scope}.CHANNEL`,
  SETUSER: `${scope}.SETUSER`,
};

export const actions = {
  ...bool.getActions('Aside', actionTypes.ASIDE),
  ...string.getActions('Channel', actionTypes.CHANNEL),
  auth: user => ({
    type: actionTypes.SETUSER,
    payload: user,
  }),
  deauth: () => ({
    type: actionTypes.SETUSER,
    payload: {},
  }),
};

export const rootSelector = state => state[scope];

export const initialState = {
  aside: false,
  channel: '',
  user: {
    id: undefined,
    username: undefined,
    nickname: undefined,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASIDE:
      return {
        ...state,
        aside: bool.helper(state.aside, action.payload),
      };
    case actionTypes.CHANNEL:
      return {
        ...state,
        channel: string.helper(state.channel, action.payload),
      };
    case actionTypes.SETUSER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
