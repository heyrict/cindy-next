import * as bool from './helpers/bool';
import * as base from './helpers/base';
import * as enumerate from './helpers/enumerate';
import {
  StateType,
  ActionContentType,
  GlobalUserType,
  ToolbarResponsiveMenuType,
  ValueOf,
} from './types';

export const scope = 'global';

export enum actionTypes {
  ASIDE = 'global.ASIDE',
  CHANNEL = 'global.CHANNEL',
  SETUSER = 'global.SETUSER',
  UPDATE_ICON = 'global.UPDATE_ICON',
  APPINIT = 'global.APPINIT',
  ROUTECHANGE = 'global.ROUTECHANGE',
  TOOLBAR_MENU = 'global.TOOLBAR_MENU',
}

export type ActionPayloadType = {
  ASIDE: ReturnType<ValueOf<bool.HelperActionType>>;
  CHANNEL: ReturnType<ValueOf<base.HelperActionType<string>>>;
  SETUSER: GlobalUserType;
  UPDATE_ICON: { icon: string | null };
  ROUTECHANGE: { url: string };
  TOOLBAR_MENU: ReturnType<
    ValueOf<enumerate.HelperActionType<ToolbarResponsiveMenuType>>
  >;
};

export const actions = {
  aside: bool.wrapActions(actionTypes.ASIDE),
  channel: base.wrapActions<string>(actionTypes.CHANNEL),
  toolbarMenu: enumerate.wrapActions<ToolbarResponsiveMenuType>(
    actionTypes.TOOLBAR_MENU,
  ),
  appInit: () =>
    ({
      type: actionTypes.APPINIT,
    } as const),
  routeChange: (url: string) =>
    ({
      type: actionTypes.ROUTECHANGE,
      payload: {
        url,
      },
    } as const),
  auth: (user: any) =>
    ({
      type: actionTypes.SETUSER,
      payload: user,
    } as const),
  updateIcon: (icon: string | null) =>
    ({
      type: actionTypes.UPDATE_ICON,
      payload: { icon },
    } as const),
  deauth: () =>
    ({
      type: actionTypes.SETUSER,
      payload: initialState.user,
    } as const),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  aside: false,
  channel: '',
  user: {
    id: undefined,
    icon: undefined,
    username: undefined,
    nickname: undefined,
  } as GlobalUserType,
  route: '',
  toolbarMenu: ToolbarResponsiveMenuType.NULL,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
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
    case actionTypes.SETUSER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATE_ICON:
      return {
        ...state,
        user: {
          ...state.user,
          icon: action.payload.icon,
        },
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
