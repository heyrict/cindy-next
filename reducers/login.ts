import * as bool from './helpers/bool';
import * as base from './helpers/base';
import { StateType, ActionContentType, ValueOf } from './types';

export const scope = 'login';

export enum actionTypes {
  LOGIN_MODAL = 'login.LOGIN_MODAL',
  SIGNUP_MODAL = 'login.SIGNUP_MODAL',
  NICKNAME = 'login.NICKNAME',
  USERNAME = 'login.USERNAME',
  PASSWORD = 'login.PASSWORD',
  RESET_FORM = 'login.RESET_FORM',
}

export type ActionPayloadType = {
  LOGIN_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  SIGNUP_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  NICKNAME: ReturnType<ValueOf<base.HelperActionType<string>>>;
  USERNAME: ReturnType<ValueOf<base.HelperActionType<string>>>;
  PASSWORD: ReturnType<ValueOf<base.HelperActionType<string>>>;
};

export const actions = {
  loginModal: bool.wrapActions(actionTypes.LOGIN_MODAL),
  signupModal: bool.wrapActions(actionTypes.SIGNUP_MODAL),
  nickname: base.wrapActions(actionTypes.NICKNAME),
  username: base.wrapActions(actionTypes.USERNAME),
  password: base.wrapActions(actionTypes.PASSWORD),
  resetForm: () =>
    ({
      type: actionTypes.RESET_FORM as actionTypes.RESET_FORM,
    } as const),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  loginModal: false,
  signupModal: false,
  nickname: '',
  username: '',
  password: '',
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
) => {
  switch (action.type) {
    case actionTypes.LOGIN_MODAL:
      return {
        ...state,
        loginModal: bool.helper(state.loginModal, action.payload),
      };
    case actionTypes.SIGNUP_MODAL:
      return {
        ...state,
        signupModal: bool.helper(state.signupModal, action.payload),
      };
    case actionTypes.NICKNAME:
      return {
        ...state,
        nickname: base.helper(state.nickname, action.payload),
      };
    case actionTypes.USERNAME:
      return {
        ...state,
        username: base.helper(state.username, action.payload),
      };
    case actionTypes.PASSWORD:
      return {
        ...state,
        password: base.helper(state.password, action.payload),
      };
    case actionTypes.RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
