import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../login';

describe('login reducer', () => {
  it.each([
    actionTypes.LOGIN_MODAL,
    actionTypes.SIGNUP_MODAL,
    actionTypes.NICKNAME,
    actionTypes.USERNAME,
    actionTypes.PASSWORD,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    };
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

  it('handle login.RESET_FORM correctly', () => {
    const action = actions.resetForm();
    const state = {
      ...initialState,
      loginModal: true,
      signupModal: false,
      nickname: 'foo',
      username: 'bar',
      password: 'foobar',
    };
    expect(reducer(state, action)).toStrictEqual(initialState);
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    };
    expect(reducer(undefined, action)).toBe(initialState);
  });
});

describe('login selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
