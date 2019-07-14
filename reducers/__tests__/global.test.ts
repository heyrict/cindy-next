import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../global';

describe('global reducer', () => {
  it.each([actionTypes.ASIDE, actionTypes.CHANNEL, actionTypes.LANGUAGE, actionTypes.TOOLBAR_MENU])(
    'handle %s correctly',
    actionType => {
      const action = {
        type: actionType,
        payload: {},
      };
      expect(reducer(initialState, action)).toStrictEqual(initialState);
    },
  );

  it('can fire fetchUser action', () => {
    actions.fetchUser();
  });

  it('handle global.ROUTECHANGE correctly', () => {
    const route = '/puzzle/1';
    const action = actions.routeChange(route);
    expect(reducer(initialState, action).route).toBe(route);
  });

  it('handle global.SETUSER correctly', () => {
    const user = {
      id: 1,
      username: 'foo',
      nickname: 'bar',
    };
    const action = actions.auth(user);
    const expectedState = {
      ...initialState,
      user,
    };
    expect(reducer(initialState, action)).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.deauth())).toStrictEqual(initialState);
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    };
    expect(reducer(undefined, action)).toBe(initialState);
  });
});

describe('global selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
