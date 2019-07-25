import * as bool from './helpers/bool';
import * as mask from './helpers/mask';
import {
  StateType,
  ActionContentType,
  SendMessageTriggerType,
  ValueOf,
} from './types';

export const scope = 'setting';

export enum actionTypes {
  SETTINGS_MODAL = 'setting.SETTINGS_MODAL',
  PUZZLE_GENRE_IMG = 'setting.PUZZLE_GENRE_IMG',
  SEND_CHAT_TRIGGER = 'setting.SEND_CHAT_TRIGGER',
  SEND_DIRECTMESSAGE_TRIGGER = 'setting.SEND_DIRECTMESSAGE_TRIGGER',
  SEND_QUESTION_TRIGGER = 'setting.SEND_QUESTION_TRIGGER',
  EDIT_QUESTION_TRIGGER = 'setting.EDIT_QUESTION_TRIGGER',
  SEND_ANSWER_TRIGGER = 'setting.SEND_ANSWER_TRIGGER',
  RIGHT_ASIDE_MINI = 'setting.RIGHT_ASIDE_MINI',
  PUSH_NOTIFICATION = 'setting.PUSH_NOTIFICATION',
  SET_STATE = 'setting.SET_STATE',
}

export type ActionPayloadType = {
  SETTINGS_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  PUZZLE_GENRE_IMG: ReturnType<ValueOf<bool.HelperActionType>>;
  RIGHT_ASIDE_MINI: ReturnType<ValueOf<bool.HelperActionType>>;
  SEND_CHAT_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_DIRECTMESSAGE_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_QUESTION_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  EDIT_QUESTION_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_ANSWER_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  PUSH_NOTIFICATION: ReturnType<ValueOf<bool.HelperActionType>>;
  SET_STATE: { state: typeof initialState };
};

export const actions = {
  settingsModal: bool.wrapActions(actionTypes.SETTINGS_MODAL),
  puzzleGenreImg: bool.wrapActions(actionTypes.PUZZLE_GENRE_IMG),
  rightAsideMini: bool.wrapActions(actionTypes.RIGHT_ASIDE_MINI),
  sendChatTrigger: mask.wrapActions(actionTypes.SEND_CHAT_TRIGGER),
  sendDirectmessageTrigger: mask.wrapActions(
    actionTypes.SEND_DIRECTMESSAGE_TRIGGER,
  ),
  editQuestionTrigger: mask.wrapActions(actionTypes.EDIT_QUESTION_TRIGGER),
  sendQuestionTrigger: mask.wrapActions(actionTypes.SEND_QUESTION_TRIGGER),
  sendAnswerTrigger: mask.wrapActions(actionTypes.SEND_ANSWER_TRIGGER),
  pushNotification: bool.wrapActions(actionTypes.PUSH_NOTIFICATION),
  setState: (
    state: { [key in keyof typeof initialState]?: typeof initialState[key] },
  ) =>
    ({
      type: actionTypes.SET_STATE,
      payload: state,
    } as const),
};

export const rootSelector = (state: StateType) =>
  state[scope] as typeof initialState;

export const initialState = {
  settingsModal: false,
  puzzleGenreImg: true,
  sendChatTrigger: SendMessageTriggerType.ON_ENTER as number,
  sendDirectmessageTrigger: SendMessageTriggerType.ON_SHIFT_ENTER as number,
  sendQuestionTrigger: SendMessageTriggerType.ON_ENTER as number,
  editQuestionTrigger: SendMessageTriggerType.ON_SHIFT_ENTER as number,
  sendAnswerTrigger: SendMessageTriggerType.ON_ENTER as number,
  rightAsideMini: false,
  pushNotification: true,
};

export const loadInitialState = (): typeof initialState => {
  if (!process.browser) return initialState;
  const storedItem = window.localStorage.getItem(`reducer:${scope}`);
  if (storedItem) {
    const parsedStoredItem = JSON.parse(storedItem) as typeof initialState;
    return {
      ...initialState,
      ...parsedStoredItem,
    };
  }
  return initialState;
};

export const saveState = (state: typeof initialState): void => {
  if (!process.browser) return;
  const storedItem = JSON.stringify(state);
  window.localStorage.setItem(`reducer:${scope}`, storedItem);
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: bool.helper(state.settingsModal, action.payload),
      };
    case actionTypes.PUZZLE_GENRE_IMG:
      return {
        ...state,
        puzzleGenreImg: bool.helper(state.puzzleGenreImg, action.payload),
      };
    case actionTypes.SEND_CHAT_TRIGGER:
      return {
        ...state,
        sendChatTrigger: mask.helper(state.sendChatTrigger, action.payload),
      };
    case actionTypes.SEND_DIRECTMESSAGE_TRIGGER:
      return {
        ...state,
        sendDirectmessageTrigger: mask.helper(
          state.sendDirectmessageTrigger,
          action.payload,
        ),
      };
    case actionTypes.SEND_QUESTION_TRIGGER:
      return {
        ...state,
        sendQuestionTrigger: mask.helper(
          state.sendQuestionTrigger,
          action.payload,
        ),
      };
    case actionTypes.EDIT_QUESTION_TRIGGER:
      return {
        ...state,
        editQuestionTrigger: mask.helper(
          state.editQuestionTrigger,
          action.payload,
        ),
      };
    case actionTypes.SEND_ANSWER_TRIGGER:
      return {
        ...state,
        sendAnswerTrigger: mask.helper(state.sendAnswerTrigger, action.payload),
      };
    case actionTypes.SET_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.RIGHT_ASIDE_MINI:
      return {
        ...state,
        rightAsideMini: bool.helper(state.rightAsideMini, action.payload),
      };
    case actionTypes.PUSH_NOTIFICATION:
      return {
        ...state,
        pushNotification: bool.helper(state.pushNotification, action.payload),
      };
    default:
      return state;
  }
};
