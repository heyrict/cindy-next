import * as base from './helpers/base';
import * as array from './helpers/array';

import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  StateType,
  ActionContentType,
  ActionSetType,
  AddReplayPanelType,
  ReplayKeywordType,
  AddReplayModeType,
} from './types';
import { mergeNeighbor } from 'common/replay';

export const scope = 'addReplay';

export const actionTypes = {
  MODE: `${scope}.MODE`,
  KEYWORD_MANIPULATE_PANEL: `${scope}.KEYWORD_MANIPULATE_PANEL`,
  KEYWORD_COUNTER: `${scope}.KEYWORD_COUNTER`,
  KEYWORD_FILTER: `${scope}.KEYWORD_FILTER`,
  REPLAY_DIALOGUES: `${scope}.REPLAY_DIALOGUES`,
  KUROMOJI_PROGRESS: `${scope}.KUROMOJI_PROGRESS`,
  SELECT_KEYWORD: `${scope}.SELECT_KEYWORD`,
  REMOVE_KEYWORD: `${scope}.REMOVE_KEYWORD`,
  RENAME_KEYWORD: `${scope}.RENAME_KEYWORD`,
  MERGE_KEYWORD: `${scope}.MERGE_KEYWORD`,
  IREMOVE_KEYWORD: `${scope}.IREMOVE_KEYWORD`,
  IRENAME_KEYWORD: `${scope}.IRENAME_KEYWORD`,
  IMERGE_KEYWORD: `${scope}.IMERGE_KEYWORD`,
  ISWAP_KEYWORD: `${scope}.ISWAP_KEYWORD`,
  IADD_KEYWORD: `${scope}.IADD_KEYWORD`,
  IEDIT_QUESTION_DIALOGUE: `${scope}.IEDIT_QUESTION_DIALOGUE`,
  IEDIT_ANSWER_DIALOGUE: `${scope}.IEDIT_ANSWER_DIALOGUE`,
  ITOGGLE_TRUE_DIALOGUE: `${scope}.ITOGGLE_TRUE_DIALOGUE`,
  ITOGGLE_GOOD_DIALOGUE: `${scope}.ITOGGLE_GOOD_DIALOGUE`,
  IREMOVE_DIALOGUE: `${scope}.IREMOVE_DIALOGUE`,
  RENAME_TO: `${scope}.RENAME_TO`,
  MERGE_TO: `${scope}.MERGE_TO`,
};

export const actions: ActionSetType = {
  ...base.getActions('Mode', actionTypes.MODE),
  ...base.getActions('KeywordCounter', actionTypes.KEYWORD_COUNTER),
  ...base.getActions('KeywordFilter', actionTypes.KEYWORD_FILTER),
  ...array.getActions('ReplayDialogues', actionTypes.REPLAY_DIALOGUES),
  ...base.getActions('KuromojiProgress', actionTypes.KUROMOJI_PROGRESS),
  ...base.getActions(
    'KeywordManipulatePanel',
    actionTypes.KEYWORD_MANIPULATE_PANEL,
  ),
  ...base.getActions('RenameTo', actionTypes.RENAME_TO),
  ...base.getActions('MergeTo', actionTypes.MERGE_TO),
  // Toggle selected keyword in panel
  toggleSelectedKeyword: (keyword: string, panel: AddReplayPanelType) => ({
    type: actionTypes.SELECT_KEYWORD,
    payload: {
      keyword,
      panel,
    },
  }),
  toggleSelectedKeywordToMerge: (keyword: string, index: number) => ({
    type: actionTypes.SELECT_KEYWORD,
    payload: {
      keyword,
      index,
      panel: AddReplayPanelType.KEYWORD_MERGE,
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
  iRemoveKeyword: (index: number, fromQuestionId: number) => ({
    type: actionTypes.IREMOVE_KEYWORD,
    payload: {
      index,
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
  iRenameKeyword: (
    index: number,
    renameTo: string,
    fromQuestionId: number,
  ) => ({
    type: actionTypes.IRENAME_KEYWORD,
    payload: {
      index,
      renameTo,
      fromQuestionId,
    },
  }),
  // Merge two keywords from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  mergeKeyword: (fromQuestionId?: number) => ({
    type: actionTypes.MERGE_KEYWORD,
    payload: {
      fromQuestionId,
    },
  }),
  iMergeKeyword: (indexA: number, indexB: number, fromQuestionId: number) => ({
    type: actionTypes.IMERGE_KEYWORD,
    payload: {
      indexA,
      indexB,
      fromQuestionId,
    },
  }),
  iSwapKeyword: (indexA: number, indexB: number, fromQuestionId: number) => ({
    type: actionTypes.ISWAP_KEYWORD,
    payload: {
      indexA,
      indexB,
      fromQuestionId,
    },
  }),
  iAddKeyword: (keyword: string, fromQuestionId: number) => ({
    type: actionTypes.IADD_KEYWORD,
    payload: {
      keyword,
      fromQuestionId,
    },
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  mode: 0 as AddReplayModeType,
  keywordManipulatePanel: 0 as AddReplayPanelType,
  keywordCounter: {} as ReplayKeywordCounterType,
  keywordFilter: '',
  countFilterInput: 0,
  replayDialogues: [] as Array<ReplayDialogueType>,
  kuromojiProgress: 0,
  keywordToSelect: null as null | string,
  keywordToMerge: [null, null] as Array<null | string>,
  keywordToEdit: null as null | string,
  keywordSelectProcess: 0,
  keywordMergeProcess: 0,
  keywordEditProcess: 0,
  renameTo: '',
  mergeTo: '',
};

export const reducer = (state = initialState, action: ActionContentType) => {
  switch (action.type) {
    case actionTypes.KEYWORD_COUNTER:
      return {
        ...state,
        keywordCounter: base.helper(state.keywordCounter, action.payload),
      };
    case actionTypes.KEYWORD_FILTER:
      return {
        ...state,
        keywordFilter: base.helper(state.keywordFilter, action.payload),
      };
    case actionTypes.REPLAY_DIALOGUES:
      return {
        ...state,
        replayDialogues: array.helper(state.replayDialogues, action.payload),
      };
    case actionTypes.MODE:
      return {
        ...state,
        mode: base.helper(state.mode, action.payload),
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
    case actionTypes.MERGE_TO:
      return {
        ...state,
        mergeTo: base.helper(state.mergeTo, action.payload),
      };
    case actionTypes.SELECT_KEYWORD: {
      const { keyword, panel, index } = action.payload;
      switch (panel) {
        case AddReplayPanelType.KEYWORD_SELECT:
          return {
            ...state,
            keywordToSelect: state.keywordToSelect === keyword ? null : keyword,
          };
        case AddReplayPanelType.KEYWORD_MERGE: {
          let keywordToMerge = [...state.keywordToMerge];
          let mergeTo = state.mergeTo;
          if (index !== undefined) {
            keywordToMerge[index] =
              keywordToMerge[index] === keyword ? null : keyword;
            if (index === 0) {
              // reset the second
              keywordToMerge[1] = null;
            }
          } else if (keywordToMerge[0] === keyword) {
            keywordToMerge = [null, keywordToMerge[1]];
          } else if (keywordToMerge[1] === keyword) {
            keywordToMerge = [null, keywordToMerge[0]];
          } else {
            keywordToMerge = [keywordToMerge[1], keyword];
          }
          return { ...state, mergeTo, keywordToMerge };
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
    // TODO `keyword` here in payload is duplicated.
    //      Use selected keyword in state instead.
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
    case actionTypes.IREMOVE_KEYWORD: {
      const { index, fromQuestionId } = action.payload as {
        index: number;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          const question_keywords = [...dialogue.question_keywords];
          question_keywords.splice(index, 1);
          return {
            ...dialogue,
            question_keywords,
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
    case actionTypes.IRENAME_KEYWORD: {
      const { index, renameTo, fromQuestionId } = action.payload as {
        index: number;
        renameTo: string;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          const question_keywords = [...dialogue.question_keywords];
          question_keywords[index] = { name: renameTo };
          return {
            ...dialogue,
            question_keywords,
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    case actionTypes.MERGE_KEYWORD: {
      const { fromQuestionId } = action.payload as {
        fromQuestionId?: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (fromQuestionId === undefined || dialogue.id === fromQuestionId) {
          return {
            ...dialogue,
            question_keywords: mergeNeighbor<ReplayKeywordType>(
              dialogue.question_keywords,
              (item, index) => item.name === state.keywordToMerge[index],
              {
                name:
                  state.mergeTo ||
                  `${state.keywordToMerge[0]}${state.keywordToMerge[1]}`,
              },
              state.keywordToMerge.length,
            ),
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    case actionTypes.IMERGE_KEYWORD: {
      const { indexA, indexB, fromQuestionId } = action.payload as {
        indexA: number;
        indexB: number;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          const question_keywords = dialogue.question_keywords;
          const kwA = question_keywords[indexA];
          const kwB = question_keywords[indexB];
          question_keywords[indexB] = { name: kwA.name + kwB.name };
          question_keywords.splice(indexA, 1);

          return {
            ...dialogue,
            question_keywords,
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    case actionTypes.ISWAP_KEYWORD: {
      const { indexA, indexB, fromQuestionId } = action.payload as {
        indexA: number;
        indexB: number;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          const question_keywords = dialogue.question_keywords;
          const kwA = question_keywords[indexA];
          const kwB = question_keywords[indexB];
          question_keywords[indexA] = kwB;
          question_keywords[indexB] = kwA;

          return {
            ...dialogue,
            question_keywords,
          };
        }
        return dialogue;
      });
      return { ...state, replayDialogues };
    }
    case actionTypes.IADD_KEYWORD: {
      const { keyword, fromQuestionId } = action.payload as {
        keyword: string;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          return {
            ...dialogue,
            question_keywords: [
              ...dialogue.question_keywords,
              { name: keyword },
            ],
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
