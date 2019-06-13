import {
  scope,
  rootSelector,
  actionTypes,
  initialState,
  reducer,
} from '../setting';

describe('setting reducer', () => {
  it('handle puzzleGenreImg correctly', () => {
    const action = {
      type: actionTypes.PUZZLE_GENRE_IMG,
      payload: {},
    };
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

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
