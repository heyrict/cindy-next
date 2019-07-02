import * as base from './helpers/base';
import * as array from './helpers/array';

import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  StateType,
  ActionContentType,
  ActionSetType,
  AddReplayPanelType,
} from './types';

export const scope = 'addReplay';

export const actionTypes = {
  KEYWORDS: `${scope}.KEYWORDS`,
  REPLAY_DIALOGUES: `${scope}.REPLAY_DIALOGUES`,
  KUROMOJI_PROGRESS: `${scope}.KUROMOJI_PROGRESS`,
  KEYWORD_MANIPULATE_PANEL: `${scope}.KEYWORD_MANIPULATE_PANEL`,
  SELECT_KEYWORD: `${scope}.SELECT_KEYWORD`,
  REMOVE_KEYWORD: `${scope}.REMOVE_KEYWORD`,
  RENAME_KEYWORD: `${scope}.RENAME_KEYWORD`,
  RENAME_TO: `${scope}.RENAME_TO`,
};

export const actions: ActionSetType = {
  ...base.getActions('Keywords', actionTypes.KEYWORDS),
  ...array.getActions('ReplayDialogues', actionTypes.REPLAY_DIALOGUES),
  ...base.getActions('KuromojiProgress', actionTypes.KUROMOJI_PROGRESS),
  ...base.getActions(
    'KeywordManipulatePanel',
    actionTypes.KEYWORD_MANIPULATE_PANEL,
  ),
  ...base.getActions('RenameTo', actionTypes.RENAME_TO),
  // Toggle selected keyword in panel
  toggleSelectedKeyword: (keyword: string, panel: AddReplayPanelType) => ({
    type: actionTypes.SELECT_KEYWORD,
    payload: {
      keyword,
      panel,
    },
  }),
  // Remove one keyword from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  removeKeyword: (keyword: string, fromQuestionId?: number) => ({
    type: actionTypes.REMOVE_KEYWORD,
    payload: {
      keyword,
      fromQuestionId,
    },
  }),
  // Rename one keyword from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  renameKeyword: (keyword: string, fromQuestionId?: number) => ({
    type: actionTypes.RENAME_KEYWORD,
    payload: {
      keyword,
      fromQuestionId,
    },
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  keywordCounter: {} as ReplayKeywordCounterType,
  countFilterInput: 0,
  replayDialogues: [] as Array<ReplayDialogueType>,
  savedKeywords: [],
  kuromojiProgress: 0,
  keywordManipulatePanel: 0,
  keywordToSelect: null as null | string,
  keywordToMerge: [null, null] as Array<null | string>,
  keywordToEdit: null as null | string,
  keywordSelectProcess: 0,
  keywordMergeProcess: 0,
  keywordEditProcess: 0,
  renameTo: '',
};

export const reducer = (state = initialState, action: ActionContentType) => {
  switch (action.type) {
    case actionTypes.KEYWORDS:
      return {
        ...state,
        keywordCounter: base.helper(state.keywordCounter, action.payload),
      };
    case actionTypes.REPLAY_DIALOGUES:
      return {
        ...state,
        replayDialogues: array.helper(state.replayDialogues, action.payload),
      };
    case actionTypes.KEYWORD_MANIPULATE_PANEL:
      return {
        ...state,
        keywordManipulatePanel: base.helper(
          state.keywordManipulatePanel,
          action.payload,
        ),
      };
    case actionTypes.KUROMOJI_PROGRESS:
      return {
        ...state,
        kuromojiProgress: base.helper(state.kuromojiProgress, action.payload),
      };
    case actionTypes.RENAME_TO:
      return {
        ...state,
        renameTo: base.helper(state.renameTo, action.payload),
      };
    case actionTypes.SELECT_KEYWORD: {
      const { keyword, panel } = action.payload;
      switch (panel) {
        case AddReplayPanelType.KEYWORD_SELECT:
          return {
            ...state,
            keywordToSelect: state.keywordToSelect === keyword ? null : keyword,
          };
        case AddReplayPanelType.KEYWORD_MERGE: {
          let keywordToMerge = [...state.keywordToMerge];
          if (keywordToMerge[0] === keyword) {
            keywordToMerge = [null, keywordToMerge[1]];
          } else if (keywordToMerge[1] === keyword) {
            keywordToMerge = [null, keywordToMerge[0]];
          } else {
            keywordToMerge = [keywordToMerge[1], keyword];
          }
          return { ...state, keywordToMerge };
        }
        case AddReplayPanelType.KEYWORD_EDIT:
          return {
            ...state,
            keywordToEdit: state.keywordToEdit === keyword ? null : keyword,
          };
        default:
          return state;
      }
    }
    case actionTypes.REMOVE_KEYWORD: {
      const { keyword, fromQuestionId } = action.payload as {
        keyword: string;
        fromQuestionId?: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (fromQuestionId === undefined || dialogue.id === fromQuestionId) {
          return {
            ...dialogue,
            question_keywords: dialogue.question_keywords.filter(
              k => k.name !== keyword,
            ),
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    case actionTypes.RENAME_KEYWORD: {
      if (state.renameTo === '') return state;
      const { keyword, fromQuestionId } = action.payload as {
        keyword: string;
        fromQuestionId?: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (fromQuestionId === undefined || dialogue.id === fromQuestionId) {
          return {
            ...dialogue,
            question_keywords: dialogue.question_keywords.map(k =>
              k.name === keyword ? { ...k, name: state.renameTo } : k,
            ),
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    default:
      return state;
  }
};
