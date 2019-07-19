import {
  scope,
  rootSelector,
  actionTypes,
  initialState,
  reducer,
} from '../setting';

describe('setting reducer', () => {
  it.each([actionTypes.PUZZLE_GENRE_IMG, actionTypes.SETTINGS_MODAL])(
    'handle %p correctly',
    actionType => {
      const action = {
        type: actionType,
        payload: {},
      };
      expect(reducer(initialState, action)).toStrictEqual(initialState);
    },
  );

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    };
    expect(reducer(undefined, action)).toBe(initialState);
  });
});

describe('setting selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
