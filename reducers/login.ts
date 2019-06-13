import * as bool from './helpers/bool';
import * as base from './helpers/base';

export const scope = 'login';

export const actionTypes = {
  LOGIN_MODAL: `${scope}.LOGIN_MODAL`,
  SIGNUP_MODAL: `${scope}.SIGNUP_MODAL`,
  NICKNAME: `${scope}.NICKNAME`,
  USERNAME: `${scope}.USERNAME`,
  PASSWORD: `${scope}.PASSWORD`,
  ERRORS: `${scope}.ERRORS`,
  RESET_FORM: `${scope}.RESET_FORM`,
};

export const actions = {
  ...bool.getActions('LoginModal', actionTypes.LOGIN_MODAL),
  ...bool.getActions('SignupModal', actionTypes.SIGNUP_MODAL),
  ...base.getActions('Nickname', actionTypes.NICKNAME),
  ...base.getActions('Username', actionTypes.USERNAME),
  ...base.getActions('Password', actionTypes.PASSWORD),
  ...base.getActions('Errors', actionTypes.ERRORS),
  resetForm: () => ({
    type: actionTypes.RESET_FORM,
  }),
};

export const rootSelector = state => state[scope];

export const initialState = {
  loginModal: false,
  signupModal: false,
  nickname: '',
  username: '',
  password: '',
  errors: [],
};

export const reducer = (state = initialState, action) => {
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
    case actionTypes.ERRORS:
      return {
        ...state,
        errors: base.helper(state.errors, action.payload),
      };
    case actionTypes.RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
