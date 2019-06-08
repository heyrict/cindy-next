import * as bool from './helpers/bool';
import * as base from './helpers/base';

export const scope = 'global';

export const actionTypes = {
  ASIDE: `${scope}.ASIDE`,
  CHANNEL: `${scope}.CHANNEL`,
  SETUSER: `${scope}.SETUSER`,
  FETCHUSER: `${scope}.FETCHUSER`,
  ROUTECHANGE: `${scope}.ROUTECHANGE`,
};

export const actions = {
  ...bool.getActions('Aside', actionTypes.ASIDE),
  ...base.getActions('Channel', actionTypes.CHANNEL),
  fetchUser: () => ({
    type: actionTypes.FETCHUSER,
  }),
  routeChange: url => ({
    type: actionTypes.ROUTECHANGE,
    payload: {
      url,
    },
  }),
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
  route: '',
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
        channel: base.helper(state.channel, action.payload),
      };
    case actionTypes.SETUSER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.ROUTECHANGE:
      return {
        ...state,
        route: action.payload.url,
      };
    default:
      return state;
  }
};
