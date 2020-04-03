import * as base from './helpers/base';
import * as array from './helpers/array';

import {
  ReplayKeywordCounterType,
  ReplayDialogueType,
  StateType,
  ActionContentType,
  AddReplayPanelType,
  ReplayKeywordType,
  AddReplayModeType,
  ValueOf,
} from './types';

import { mergeNeighbor } from 'common/replay';

export const scope = 'addReplay';

export enum actionTypes {
  COUNT_FILTER_INPUT = 'addReplay.COUNT_FILTER_INPUT',
  REPLAY_DIALOGUES = 'addReplay.REPLAY_DIALOGUES',
  KUROMOJI_PROGRESS = 'addReplay.KUROMOJI_PROGRESS',
  KEYWORDS_TOGGLE = 'addReplay.KEYWORDS_TOGGLE',
  KEYWORDS_USEMINCOUNT = 'addReplay.KEYWORDS_USEMINCOUNT',
  KEYWORD_MANIPULATE_PANEL = 'addReplay.KEYWORD_MANIPULATE_PANEL',
  // action types for editing
  MODE = 'addReplay.MODE',
  KEYWORD_COUNTER = 'addReplay.KEYWORD_COUNTER',
  KEYWORD_FILTER = 'addReplay.KEYWORD_FILTER',
  SELECT_KEYWORD = 'addReplay.SELECT_KEYWORD',
  REMOVE_KEYWORD = 'addReplay.REMOVE_KEYWORD',
  RENAME_KEYWORD = 'addReplay.RENAME_KEYWORD',
  MERGE_KEYWORD = 'addReplay.MERGE_KEYWORD',
  IREMOVE_KEYWORD = 'addReplay.IREMOVE_KEYWORD',
  IREMOVE_KEYWORD_BY = 'addReplay.IREMOVE_KEYWORD_BY',
  IRENAME_KEYWORD = 'addReplay.IRENAME_KEYWORD',
  IMERGE_KEYWORD = 'addReplay.IMERGE_KEYWORD',
  ISWAP_KEYWORD = 'addReplay.ISWAP_KEYWORD',
  IADD_KEYWORD = 'addReplay.IADD_KEYWORD',
  IEDIT_QUESTION_DIALOGUE = 'addReplay.IEDIT_QUESTION_DIALOGUE',
  IEDIT_ANSWER_DIALOGUE = 'addReplay.IEDIT_ANSWER_DIALOGUE',
  ITOGGLE_TRUE_DIALOGUE = 'addReplay.ITOGGLE_TRUE_DIALOGUE',
  ITOGGLE_GOOD_DIALOGUE = 'addReplay.ITOGGLE_GOOD_DIALOGUE',
  IREMOVE_DIALOGUE = 'addReplay.IREMOVE_DIALOGUE',
  RENAME_TO = 'addReplay.RENAME_TO',
  MERGE_TO = 'addReplay.MERGE_TO',
}

export type ActionPayloadType = {
  COUNT_FILTER_INPUT: ReturnType<ValueOf<base.HelperActionType<number>>>;
  REPLAY_DIALOGUES: ReturnType<
    ValueOf<array.HelperActionType<ReplayDialogueType>>
  >;
  KUROMOJI_PROGRESS: ReturnType<ValueOf<base.HelperActionType<number>>>;
  KEYWORD_MANIPULATE_PANEL: ReturnType<
    ValueOf<base.HelperActionType<AddReplayPanelType>>
  >;
  KEYWORDS_TOGGLE: {
    keyword: string;
  };
  KEYWORDS_USEMINCOUNT: {
    count: number;
  };
  MODE: ReturnType<ValueOf<base.HelperActionType<AddReplayModeType>>>;
  KEYWORD_COUNTER: ReturnType<
    ValueOf<base.HelperActionType<ReplayKeywordCounterType>>
  >;
  KEYWORD_FILTER: ReturnType<ValueOf<base.HelperActionType<string>>>;
  RENAME_TO: ReturnType<ValueOf<base.HelperActionType<string>>>;
  MERGE_TO: ReturnType<ValueOf<base.HelperActionType<string>>>;
};

export const actions = {
  countFilterInput: base.wrapActions<number>(actionTypes.COUNT_FILTER_INPUT),
  replayDialogues: array.wrapActions<ReplayDialogueType>(
    actionTypes.REPLAY_DIALOGUES,
  ),
  kuromojiProgress: base.wrapActions<number>(actionTypes.KUROMOJI_PROGRESS),
  keywordManipulatePanel: base.wrapActions<AddReplayPanelType>(
    actionTypes.KEYWORD_MANIPULATE_PANEL,
  ),
  toggleKeywordUse: (keyword: string) =>
    ({
      type: actionTypes.KEYWORDS_TOGGLE,
      payload: {
        keyword,
      },
    } as const),
  setKeywordsUseMinCount: (count: number) =>
    ({
      type: actionTypes.KEYWORDS_USEMINCOUNT,
      payload: {
        count,
      },
    } as const),
  mode: base.wrapActions<AddReplayModeType>(actionTypes.MODE),
  keywordCounter: base.wrapActions<ReplayKeywordCounterType>(
    actionTypes.KEYWORD_COUNTER,
  ),
  keywordFilter: base.wrapActions<string>(actionTypes.KEYWORD_FILTER),
  renameTo: base.wrapActions<string>(actionTypes.RENAME_TO),
  mergeTo: base.wrapActions<string>(actionTypes.MERGE_TO),
  // Toggle selected keyword in panel
  toggleSelectedKeyword: (keyword: string, panel: AddReplayPanelType) =>
    ({
      type: actionTypes.SELECT_KEYWORD,
      payload: {
        keyword,
        panel,
      },
    } as const),
  toggleSelectedKeywordToMerge: (keyword: string, index: number) =>
    ({
      type: actionTypes.SELECT_KEYWORD,
      payload: {
        keyword,
        index,
        panel: AddReplayPanelType.KEYWORD_MERGE,
      },
    } as const),
  // Remove one keyword from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  removeKeyword: (keyword: string, fromQuestionId?: number) =>
    ({
      type: actionTypes.REMOVE_KEYWORD,
      payload: {
        keyword,
        fromQuestionId,
      },
    } as const),
  iRemoveKeyword: (index: number, fromQuestionId: number) =>
    ({
      type: actionTypes.IREMOVE_KEYWORD,
      payload: {
        index,
        fromQuestionId,
      },
    } as const),
  iRemoveKeywordBy: (
    by: (kw: ReplayKeywordType) => boolean,
    fromQuestionId: number,
  ) =>
    ({
      type: actionTypes.IREMOVE_KEYWORD_BY,
      payload: {
        by,
        fromQuestionId,
      },
    } as const),
  // Rename one keyword from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  renameKeyword: (keyword: string, fromQuestionId?: number) =>
    ({
      type: actionTypes.RENAME_KEYWORD,
      payload: {
        keyword,
        fromQuestionId,
      },
    } as const),
  iRenameKeyword: (index: number, renameTo: string, fromQuestionId: number) =>
    ({
      type: actionTypes.IRENAME_KEYWORD,
      payload: {
        index,
        renameTo,
        fromQuestionId,
      },
    } as const),
  // Merge two keywords from question.
  // If fromQuestionId is not provided, remove all existing keywords.
  mergeKeyword: (fromQuestionId?: number) =>
    ({
      type: actionTypes.MERGE_KEYWORD,
      payload: {
        fromQuestionId,
      },
    } as const),
  iMergeKeyword: (indexA: number, indexB: number, fromQuestionId: number) =>
    ({
      type: actionTypes.IMERGE_KEYWORD,
      payload: {
        indexA,
        indexB,
        fromQuestionId,
      },
    } as const),
  iSwapKeyword: (indexA: number, indexB: number, fromQuestionId: number) =>
    ({
      type: actionTypes.ISWAP_KEYWORD,
      payload: {
        indexA,
        indexB,
        fromQuestionId,
      },
    } as const),
  iAddKeyword: (keyword: string, fromQuestionId: number) =>
    ({
      type: actionTypes.IADD_KEYWORD,
      payload: {
        keyword,
        fromQuestionId,
      },
    } as const),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  mode: 0 as AddReplayModeType,
  keywordCounter: {} as ReplayKeywordCounterType,
  keywordFilter: '',
  countFilterInput: 0,
  replayDialogues: [] as Array<ReplayDialogueType>,
  kuromojiProgress: 0,
  keywordManipulatePanel: AddReplayPanelType.KEYWORD_SELECT,
  keywordToSelect: null as null | string,
  keywordToMerge: [null, null] as Array<null | string>,
  keywordToEdit: null as null | string,
  keywordSelectProcess: 0,
  keywordMergeProcess: 0,
  keywordEditProcess: 0,
  renameTo: '',
  mergeTo: '',
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
) => {
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
    case actionTypes.IREMOVE_KEYWORD_BY: {
      const { by, fromQuestionId } = action.payload as {
        by: (kw: ReplayKeywordType) => boolean;
        fromQuestionId: number;
      };
      const replayDialogues = state.replayDialogues.map(dialogue => {
        if (dialogue.id === fromQuestionId) {
          const question_keywords = dialogue.question_keywords.filter(by);
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
          question_keywords[index] = {
            name: renameTo,
            ...question_keywords[index],
          };
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
                tfidf_index: 1,
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
          question_keywords[indexB] = {
            name: kwA.name + kwB.name,
            tfidf_index: (kwA.tfidf_index + kwB.tfidf_index) / 2,
          };
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
              { name: keyword, tfidf_index: 1 },
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
