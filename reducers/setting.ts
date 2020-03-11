import { setCookie } from 'common/cookie';
import * as array from './helpers/array';
import * as base from './helpers/base';
import * as bool from './helpers/bool';
import * as mask from './helpers/mask';
import {
  StateType,
  ActionContentType,
  SendMessageTriggerType,
  ValueOf,
} from './types';
import { APPLOCALES } from 'settings';

export const scope = 'setting';

export enum actionTypes {
  SETTINGS_MODAL = 'setting.SETTINGS_MODAL',
  CONFIRM_CREATE_PUZZLE = 'setting.CONFIRM_CREATE_PUZZLE',
  SHOW_GROTESQUE_WARNING = 'setting.SHOW_GROTESQUE_WARNING',
  IGNORED_GROTESQUE_PUZZLES = 'setting.IGNORED_GROTESQUE_PUZZLES',
  PUZZLE_GENRE_IMG = 'setting.PUZZLE_GENRE_IMG',
  SEND_CHAT_TRIGGER = 'setting.SEND_CHAT_TRIGGER',
  SEND_DIRECTMESSAGE_TRIGGER = 'setting.SEND_DIRECTMESSAGE_TRIGGER',
  SEND_QUESTION_TRIGGER = 'setting.SEND_QUESTION_TRIGGER',
  EDIT_QUESTION_TRIGGER = 'setting.EDIT_QUESTION_TRIGGER',
  SEND_ANSWER_TRIGGER = 'setting.SEND_ANSWER_TRIGGER',
  RIGHT_ASIDE_MINI = 'setting.RIGHT_ASIDE_MINI',
  PUSH_NOTIFICATION = 'setting.PUSH_NOTIFICATION',
  SET_STATE = 'setting.SET_STATE',
  LANGUAGE = 'setting.LANGUAGE',
  MULTICOL = 'setting.MULTICOL',
}

export type ActionPayloadType = {
  SETTINGS_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  CONFIRM_CREATE_PUZZLE: ReturnType<ValueOf<bool.HelperActionType>>;
  SHOW_GROTESQUE_WARNING: ReturnType<ValueOf<bool.HelperActionType>>;
  IGNORED_GROTESQUE_PUZZLES: ReturnType<ValueOf<array.HelperActionType>>;
  PUZZLE_GENRE_IMG: ReturnType<ValueOf<bool.HelperActionType>>;
  RIGHT_ASIDE_MINI: ReturnType<ValueOf<bool.HelperActionType>>;
  SEND_CHAT_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_DIRECTMESSAGE_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_QUESTION_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  EDIT_QUESTION_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  SEND_ANSWER_TRIGGER: ReturnType<ValueOf<mask.HelperActionType>>;
  PUSH_NOTIFICATION: ReturnType<ValueOf<bool.HelperActionType>>;
  SET_STATE: { state: typeof initialState };
  LANGUAGE: ReturnType<
    ValueOf<base.HelperActionType<typeof APPLOCALES[0] | undefined>>
  >;
  MULTICOL: ReturnType<ValueOf<bool.HelperActionType>>;
};

export const actions = {
  settingsModal: bool.wrapActions(actionTypes.SETTINGS_MODAL),
  confirmCreatePuzzle: bool.wrapActions(actionTypes.CONFIRM_CREATE_PUZZLE),
  showGrotesqueWarning: bool.wrapActions(actionTypes.SHOW_GROTESQUE_WARNING),
  ignoredGrotesquePuzzles: array.wrapActions(
    actionTypes.IGNORED_GROTESQUE_PUZZLES,
  ),
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
  language: base.wrapActions<typeof APPLOCALES[0] | undefined>(
    actionTypes.LANGUAGE,
  ),
  multicol: bool.wrapActions(actionTypes.MULTICOL),
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
  confirmCreatePuzzle: true,
  showGrotesqueWarning: true,
  ignoredGrotesquePuzzles: new Array() as Array<number>,
  puzzleGenreImg: true,
  sendChatTrigger: SendMessageTriggerType.ON_ENTER as number,
  sendDirectmessageTrigger: SendMessageTriggerType.ON_SHIFT_ENTER as number,
  sendQuestionTrigger: SendMessageTriggerType.ON_ENTER as number,
  editQuestionTrigger: SendMessageTriggerType.ON_SHIFT_ENTER as number,
  sendAnswerTrigger: SendMessageTriggerType.ON_ENTER as number,
  rightAsideMini: false,
  pushNotification: true,
  language: undefined as typeof APPLOCALES[0] | undefined,
  multicol: true,
};

type SettingsStateType = typeof initialState;

export const loadInitialState = (): SettingsStateType => {
  if (!process.browser) return initialState;
  const storedItem = window.localStorage.getItem(`reducer:${scope}`);
  if (storedItem) {
    const parsedStoredItem = JSON.parse(storedItem) as SettingsStateType;
    return {
      ...initialState,
      ...parsedStoredItem,
    };
  }
  return initialState;
};

const MAX_STORAGE_ARRAY_LENGTH = 50;
const getStateToSave = (state: SettingsStateType): SettingsStateType => {
  return {
    ...state,
    ignoredGrotesquePuzzles: state.ignoredGrotesquePuzzles.slice(
      state.ignoredGrotesquePuzzles.length - MAX_STORAGE_ARRAY_LENGTH,
    ),
  };
};

export const saveState = (state: SettingsStateType): void => {
  if (!process.browser) return;
  const storedItem = JSON.stringify(getStateToSave(state));
  window.localStorage.setItem(`reducer:${scope}`, storedItem);

  // set cookie for server side use
  setCookie('settings-server-side', storedItem, 8 * 365 * 86400);
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
): SettingsStateType => {
  switch (action.type) {
    case actionTypes.SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: bool.helper(state.settingsModal, action.payload),
      };
    case actionTypes.CONFIRM_CREATE_PUZZLE:
      return {
        ...state,
        confirmCreatePuzzle: bool.helper(
          state.confirmCreatePuzzle,
          action.payload,
        ),
      };
    case actionTypes.SHOW_GROTESQUE_WARNING:
      return {
        ...state,
        showGrotesqueWarning: bool.helper(
          state.showGrotesqueWarning,
          action.payload,
        ),
      };
    case actionTypes.IGNORED_GROTESQUE_PUZZLES:
      return {
        ...state,
        ignoredGrotesquePuzzles: array.helper(
          state.ignoredGrotesquePuzzles,
          action.payload,
        ),
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
    case actionTypes.LANGUAGE:
      return {
        ...state,
        language: base.helper(state.language, action.payload),
      };
    case actionTypes.MULTICOL:
      return {
        ...state,
        multicol: bool.helper(state.multicol, action.payload),
      };
    default:
      return state;
  }
};
