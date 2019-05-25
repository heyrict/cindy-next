import * as bool from './helpers/bool';
import * as string from './helpers/string';

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
  ...string.getActions('Nickname', actionTypes.NICKNAME),
  ...string.getActions('Username', actionTypes.USERNAME),
  ...string.getActions('Password', actionTypes.PASSWORD),
  ...string.getActions('Errors', actionTypes.ERRORS),
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
        nickname: string.helper(state.nickname, action.payload),
      };
    case actionTypes.USERNAME:
      return {
        ...state,
        username: string.helper(state.username, action.payload),
      };
    case actionTypes.PASSWORD:
      return {
        ...state,
        password: string.helper(state.password, action.payload),
      };
    case actionTypes.ERRORS:
      return {
        ...state,
        errors: string.helper(state.errors, action.payload),
      };
    case actionTypes.RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
