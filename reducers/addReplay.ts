import * as base from './helpers/base';
import * as array from './helpers/array';

import {
  ReplayKeywordsType,
  ReplayDialogueType,
  StateType,
  ActionContentType,
  ValueOf,
} from './types';
import { PanelEnum } from 'components/Workbench/Keyword/KeywordManipulatePanel/types';

export const scope = 'addReplay';

export enum actionTypes {
  KEYWORDS = 'addReplay.KEYWORDS',
  COUNT_FILTER_INPUT = 'addReplay.COUNT_FILTER_INPUT',
  REPLAY_DIALOGUES = 'addReplay.REPLAY_DIALOGUES',
  SAVED_KEYWORDS = 'addReplay.SAVED_KEYWORDS',
  KUROMOJI_PROGRESS = 'addReplay.KUROMOJI_PROGRESS',
  KEYWORDS_TOGGLE = 'addReplay.KEYWORDS_TOGGLE',
  KEYWORDS_USEMINCOUNT = 'addReplay.KEYWORDS_USEMINCOUNT',
  KEYWORD_MANIPULATE_PANEL = 'addReplay.KEYWORD_MANIPULATE_PANEL',
}

export type ActionPayloadType = {
  KEYWORDS: ReturnType<ValueOf<base.HelperActionType<ReplayKeywordsType>>>;
  COUNT_FILTER_INPUT: ReturnType<ValueOf<base.HelperActionType<number>>>;
  REPLAY_DIALOGUES: ReturnType<
    ValueOf<array.HelperActionType<ReplayDialogueType>>
  >;
  SAVED_KEYWORDS: ReturnType<
    ValueOf<array.HelperActionType<ReplayKeywordsType>>
  >;
  KUROMOJI_PROGRESS: ReturnType<ValueOf<base.HelperActionType<number>>>;
  KEYWORD_MANIPULATE_PANEL: ReturnType<
    ValueOf<base.HelperActionType<PanelEnum>>
  >;
  KEYWORDS_TOGGLE: {
    keyword: string;
  };
  KEYWORDS_USEMINCOUNT: {
    count: number;
  };
};

export const actions = {
  countFilterInput: base.wrapActions<number>(actionTypes.COUNT_FILTER_INPUT),
  keywords: base.wrapActions<ReplayKeywordsType>(actionTypes.KEYWORDS),
  replayDialogues: array.wrapActions<ReplayDialogueType>(
    actionTypes.REPLAY_DIALOGUES,
  ),
  savedKeywords: array.wrapActions(actionTypes.SAVED_KEYWORDS),
  kuromojiProgress: base.wrapActions<number>(actionTypes.KUROMOJI_PROGRESS),
  keywordManipulatePanel: base.wrapActions<PanelEnum>(
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
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  keywords: {} as ReplayKeywordsType,
  countFilterInput: 0,
  replayDialogues: [] as Array<ReplayDialogueType>,
  savedKeywords: [],
  kuromojiProgress: 0,
  keywordManipulatePanel: PanelEnum.SELECT,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
) => {
  switch (action.type) {
    case actionTypes.KEYWORDS:
      return {
        ...state,
        keywords: base.helper(state.keywords, action.payload),
      };
    case actionTypes.COUNT_FILTER_INPUT:
      return {
        ...state,
        countFilterInput: base.helper(state.countFilterInput, action.payload),
      };
    case actionTypes.REPLAY_DIALOGUES:
      return {
        ...state,
        replayDialogues: array.helper(state.replayDialogues, action.payload),
      };
    case actionTypes.SAVED_KEYWORDS:
      return {
        ...state,
        savedKeywords: array.helper(state.savedKeywords, action.payload),
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
    case actionTypes.KEYWORDS_TOGGLE: {
      const { keyword } = action.payload;
      const keywords = { ...state.keywords };
      keywords[keyword].use = !keywords[keyword].use;
      return {
        ...state,
        keywords,
      };
    }
    case actionTypes.KEYWORDS_USEMINCOUNT: {
      const { count } = action.payload;
      const keywords = { ...state.keywords };
      Object.keys(keywords).forEach(key => {
        if (keywords[key].count >= count) {
          keywords[key].use = true;
        } else {
          keywords[key].use = false;
        }
      });
      return {
        ...state,
        keywords,
      };
    }
    default:
      return state;
  }
};
