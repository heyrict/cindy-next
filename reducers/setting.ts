import * as bool from './helpers/bool';
import * as mask from './helpers/mask';
import {
  StateType,
  ActionContentType,
  SendMessageTriggerType,
  ActionSetType,
} from './types';

export const scope = 'setting';

export const actionTypes = {
  SETTINGS_MODAL: `${scope}.SETTINGS_MODAL`,
  PUZZLE_GENRE_IMG: `${scope}.PUZZLE_GENRE_IMG`,
  SEND_CHAT_TRIGGER: `${scope}.SEND_CHAT_TRIGGER`,
  SEND_QUESTION_TRIGGER: `${scope}.SEND_QUESTION_TRIGGER`,
  EDIT_QUESTION_TRIGGER: `${scope}.EDIT_QUESTION_TRIGGER`,
  SEND_ANSWER_TRIGGER: `${scope}.SEND_ANSWER_TRIGGER`,
  RIGHT_ASIDE_MINI: `${scope}.RIGHT_ASIDE_MINI`,
  SET_STATE: `${scope}.SET_STATE`,
};

export const actions = {
  ...bool.getActions('SettingsModal', actionTypes.SETTINGS_MODAL),
  ...bool.getActions('PuzzleGenreImg', actionTypes.PUZZLE_GENRE_IMG),
  ...bool.getActions('RightAsideMini', actionTypes.RIGHT_ASIDE_MINI),
  ...mask.getActions('SendChatTrigger', actionTypes.SEND_CHAT_TRIGGER),
  ...mask.getActions('EditQuestionTrigger', actionTypes.EDIT_QUESTION_TRIGGER),
  ...mask.getActions('SendQuestionTrigger', actionTypes.SEND_QUESTION_TRIGGER),
  ...mask.getActions('SendAnswerTrigger', actionTypes.SEND_ANSWER_TRIGGER),
  setState: (
    state: { [key in keyof typeof initialState]?: typeof initialState[key] },
  ) => ({
    type: actionTypes.SET_STATE,
    payload: state,
  }),
} as ActionSetType;

export const rootSelector = (state: StateType) =>
  state[scope] as typeof initialState;

export const initialState = {
  settingsModal: false,
  puzzleGenreImg: true,
  sendChatTrigger: SendMessageTriggerType.ON_ENTER as number,
  sendQuestionTrigger: SendMessageTriggerType.ON_ENTER as number,
  editQuestionTrigger: SendMessageTriggerType.ON_SHIFT_ENTER as number,
  sendAnswerTrigger: SendMessageTriggerType.ON_ENTER as number,
  rightAsideMini: false,
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

export const reducer = (state = initialState, action: ActionContentType) => {
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
    default:
      return state;
  }
};
