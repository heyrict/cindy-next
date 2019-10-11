import * as bool from './helpers/bool';
import * as base from './helpers/base';
import { StateType, ActionContentType, ValueOf } from './types';

export const scope = 'chat';

export enum actionTypes {
  CHANNEL_CHANGE_INPUT = 'chat.CHANNEL_CHANGE_INPUT',
  CHANNEL_CHANGE_MODAL = 'chat.CHANNEL_CHANGE_MODAL',
  CHATROOM_CREATE_MODAL = 'chat.CHATROOM_CREATE_MODAL',
  CHAT_INPUT_MODAL = 'chat.CHAT_INPUT_MODAL',
  DESCRIPTION_MODAL = 'chat.DESCRIPTION_MODAL',
  CHAT_HASNEW = 'chat.CHAT_HASNEW',
  CHATMESSAGE_UPDATE = 'chat.CHATMESSAGE_UPDATE',
}

export type ActionPayloadType = {
  CHANNEL_CHANGE_INPUT: ReturnType<ValueOf<base.HelperActionType<string>>>;
  CHANNEL_CHANGE_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  CHATROOM_CREATE_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  CHAT_INPUT_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  DESCRIPTION_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  CHAT_HASNEW: ReturnType<ValueOf<bool.HelperActionType>>;
  CHATMESSAGE_UPDATE: {
    chatroomId: number;
    messagesHash: number;
  };
};

export const actions = {
  channelChangeInput: base.wrapActions(actionTypes.CHANNEL_CHANGE_INPUT),
  channelChangeModal: bool.wrapActions(actionTypes.CHANNEL_CHANGE_MODAL),
  chatroomCreateModal: bool.wrapActions(actionTypes.CHATROOM_CREATE_MODAL),
  chatInputModal: bool.wrapActions(actionTypes.CHAT_INPUT_MODAL),
  descriptionModal: bool.wrapActions(actionTypes.DESCRIPTION_MODAL),
  chatHasnew: bool.wrapActions(actionTypes.CHAT_HASNEW),
  chatmessageUpdate: (chatroomId: number, messagesHash: number) =>
    ({
      type: actionTypes.CHATMESSAGE_UPDATE,
      payload: {
        chatroomId,
        messagesHash,
      },
    } as const),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  channelChangeInput: '',
  channelChangeModal: false,
  chatroomCreateModal: false,
  chatInputModal: false,
  descriptionModal: false,
  chatHasnew: false,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.CHANNEL_CHANGE_INPUT:
      return {
        ...state,
        channelChangeInput: base.helper(
          state.channelChangeInput,
          action.payload,
        ),
      };
    case actionTypes.CHANNEL_CHANGE_MODAL:
      return {
        ...state,
        channelChangeModal: bool.helper(
          state.channelChangeModal,
          action.payload,
        ),
      };
    case actionTypes.CHATROOM_CREATE_MODAL:
      return {
        ...state,
        chatroomCreateModal: bool.helper(
          state.chatroomCreateModal,
          action.payload,
        ),
      };
    case actionTypes.CHAT_INPUT_MODAL:
      return {
        ...state,
        chatInputModal: bool.helper(state.chatInputModal, action.payload),
      };
    case actionTypes.DESCRIPTION_MODAL:
      return {
        ...state,
        descriptionModal: bool.helper(state.descriptionModal, action.payload),
      };
    case actionTypes.CHAT_HASNEW:
      return {
        ...state,
        chatHasnew: bool.helper(state.chatHasnew, action.payload),
      };
    default:
      return state;
  }
};
