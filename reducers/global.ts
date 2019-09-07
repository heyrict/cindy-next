import * as bool from './helpers/bool';
import * as base from './helpers/base';
import * as enumerate from './helpers/enumerate';
import {
  StateType,
  ActionContentType,
  GlobalUserType,
  ToolbarResponsiveMenuType,
  ValueOf,
  YandexUserReportType,
} from './types';

export const scope = 'global';

export enum actionTypes {
  ASIDE = 'global.ASIDE',
  CHANNEL = 'global.CHANNEL',
  SETUSER = 'global.SETUSER',
  APPINIT = 'global.APPINIT',
  ROUTECHANGE = 'global.ROUTECHANGE',
  TOOLBAR_MENU = 'global.TOOLBAR_MENU',
  YANDEX_USERS_REPORT = 'global.YANDEX_USERS_REPORT',
  FETCH_YANDEX_USERS_REPORT = 'global.FETCH_YANDEX_USERS_REPORT',
}

export type ActionPayloadType = {
  ASIDE: ReturnType<ValueOf<bool.HelperActionType>>;
  CHANNEL: ReturnType<ValueOf<base.HelperActionType<string>>>;
  SETUSER: GlobalUserType;
  ROUTECHANGE: { url: string };
  TOOLBAR_MENU: ReturnType<
    ValueOf<enumerate.HelperActionType<ToolbarResponsiveMenuType>>
  >;
  YANDEX_USERS_REPORT: ReturnType<
    ValueOf<base.HelperActionType<YandexUserReportType>>
  >;
};

export const actions = {
  aside: bool.wrapActions(actionTypes.ASIDE),
  channel: base.wrapActions<string>(actionTypes.CHANNEL),
  toolbarMenu: enumerate.wrapActions<ToolbarResponsiveMenuType>(
    actionTypes.TOOLBAR_MENU,
  ),
  yandexUsersReport: base.wrapActions<YandexUserReportType>(
    actionTypes.YANDEX_USERS_REPORT,
  ),
  appInit: () =>
    ({
      type: actionTypes.APPINIT,
    } as const),
  fetchYandexUsersReport: () =>
    ({
      type: actionTypes.FETCH_YANDEX_USERS_REPORT,
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
  yandexUsersReport: null as YandexUserReportType,
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
    case actionTypes.TOOLBAR_MENU:
      return {
        ...state,
        toolbarMenu: enumerate.helper(state.toolbarMenu, action.payload),
      };
    case actionTypes.YANDEX_USERS_REPORT:
      return {
        ...state,
        yandexUsersReport: base.helper(state.yandexUsersReport, action.payload),
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
