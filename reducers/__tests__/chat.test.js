import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../chat';

describe('chat reducer', () => {
  it.each([
    actionTypes.CHAT_INPUT,
    actionTypes.CHANNEL_CHANGE_INPUT,
    actionTypes.CHANNEL_CHANGE_MODAL,
    actionTypes.CHAT_INPUT_MODAL,
    actionTypes.DESCRIPTION_MODAL,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
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

describe('chat selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
