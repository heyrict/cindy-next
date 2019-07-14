import * as bool from './helpers/bool';
import * as base from './helpers/base';
import * as enumerate from './helpers/enumerate';
import {
  StateType,
  ActionContentType,
  ActionSetType,
  GlobalUserType,
  ToolbarResponsiveMenuType,
} from './types';

export const scope = 'global';

export const actionTypes = {
  ASIDE: `${scope}.ASIDE`,
  CHANNEL: `${scope}.CHANNEL`,
  SETUSER: `${scope}.SETUSER`,
  FETCHUSER: `${scope}.FETCHUSER`,
  ROUTECHANGE: `${scope}.ROUTECHANGE`,
  LANGUAGE: `${scope}.LANGUAGE`,
  TOOLBAR_MENU: `${scope}.TOOLBAR_MENU`,
};

export const actions: ActionSetType = {
  ...bool.getActions('Aside', actionTypes.ASIDE),
  ...base.getActions('Channel', actionTypes.CHANNEL),
  ...base.getActions('Language', actionTypes.LANGUAGE),
  ...enumerate.getActions('ToolbarMenu', actionTypes.TOOLBAR_MENU),
  fetchUser: () => ({
    type: actionTypes.FETCHUSER,
  }),
  routeChange: (url: string) => ({
    type: actionTypes.ROUTECHANGE,
    payload: {
      url,
    },
  }),
  auth: (user: any) => ({
    type: actionTypes.SETUSER,
    payload: user,
  }),
  deauth: () => ({
    type: actionTypes.SETUSER,
    payload: initialState.user,
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  aside: false,
  channel: '',
  language: undefined,
  user: {
    id: undefined,
    username: undefined,
    nickname: undefined,
  } as GlobalUserType,
  route: '',
  toolbarMenu: ToolbarResponsiveMenuType.NULL,
};

export const reducer = (
  state = initialState,
  action: ActionContentType,
): typeof initialState => {
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
    case actionTypes.LANGUAGE:
      return {
        ...state,
        language: base.helper(state.language, action.payload),
      };
    case actionTypes.SETUSER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.TOOLBAR_MENU:
      return {
        ...state,
        toolbarMenu: enumerate.helper(state.toolbarMenu, action.payload),
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
