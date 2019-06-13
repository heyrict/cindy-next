import * as bool from './helpers/bool';
import * as base from './helpers/base';
import { ActionSetType, StateType, ActionContentType } from './types';

export const scope = 'chat';

export const actionTypes = {
  CHANNEL_CHANGE_INPUT: `${scope}.CHANNEL_CHANGE_INPUT`,
  CHANNEL_CHANGE_MODAL: `${scope}.CHANNEL_CHANGE_MODAL`,
  CHAT_INPUT_MODAL: `${scope}.CHAT_INPUT_MODAL`,
  DESCRIPTION_MODAL: `${scope}.DESCRIPTION_MODAL`,
};

export const actions: ActionSetType = {
  ...base.getActions('ChannelChangeInput', actionTypes.CHANNEL_CHANGE_INPUT),
  ...bool.getActions('ChannelChangeModal', actionTypes.CHANNEL_CHANGE_MODAL),
  ...bool.getActions('ChatInputModal', actionTypes.CHAT_INPUT_MODAL),
  ...bool.getActions('DescriptionModal', actionTypes.DESCRIPTION_MODAL),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  channelChangeInput: '',
  channelChangeModal: false,
  chatInputModal: false,
  descriptionModal: false,
};

export const reducer = (
  state = initialState,
  action: ActionContentType,
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
    default:
      return state;
  }
};
