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
    actionTypes.CHANNEL_CHANGE_INPUT,
    actionTypes.CHANNEL_CHANGE_MODAL,
    actionTypes.CHAT_INPUT_MODAL,
    actionTypes.DESCRIPTION_MODAL,
    actionTypes.CHAT_HASNEW,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    };
    expect(reducer(initialState, action as any)).toStrictEqual(initialState);
  });

  it('handle chatmessageUpdate correctly', () => {
    const chatroomId = 1;
    const messagesHash = 42;
    const action = actions.chatmessageUpdate(chatroomId, messagesHash);
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
      payload: undefined,
    };
    expect(reducer(undefined, action as any)).toBe(initialState);
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
