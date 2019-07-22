import {
  scope,
  rootSelector,
  actionTypes,
  initialState,
  reducer,
} from '../puzzle';

describe('puzzle reducer', () => {
  it.each([
    actionTypes.PARTICIPANTS,
    actionTypes.PUZZLE_CONTENT,
    actionTypes.PUZZLE_MEMO,
    actionTypes.PUZZLE_MEMO_HASNEW,
    actionTypes.SOLVED_LONGTERM_YAMI,
    actionTypes.RIGHT_ASIDE,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    };
    expect(reducer(initialState, action as any)).toStrictEqual(initialState);
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
      payload: undefined,
    };
    expect(reducer(undefined, action as any)).toBe(initialState);
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
