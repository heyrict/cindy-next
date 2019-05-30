import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../global';

describe('global reducer', () => {
  it.each([actionTypes.ASIDE, actionTypes.CHANNEL])(
    'handle %s correctly',
    actionType => {
      const action = {
        type: actionType,
        payload: {},
      };
      expect(reducer(initialState, action)).toStrictEqual(initialState);
    },
  );

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
