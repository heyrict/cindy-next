import * as bool from './helpers/bool';
import * as base from './helpers/base';
import * as array from './helpers/array';

export const scope = 'addReplay';

export const actionTypes = {
  KEYWORDS: `${scope}.KEYWORDS`,
  COUNT_FILTER_INPUT: `${scope}.COUNT_FILTER_INPUT`,
  REPLAY_DIALOGUES: `${scope}.REPLAY_DIALOGUES`,
  SAVED_KEYWORDS: `${scope}.SAVED_KEYWORDS`,
  KUROMOJI_PROGRESS: `${scope}.KUROMOJI_PROGRESS`,
  KEYWORDS_TOGGLE: `${scope}.KEYWORDS_TOGGLE`,
  KEYWORDS_USEMINCOUNT: `${scope}.KEYWORDS_USEMINCOUNT`,
  KEYWORD_MANIPULATE_PANEL: `${scope}.KEYWORD_MANIPULATE_PANEL`,
};

export const actions = {
  ...base.getActions('CountFilterInput', actionTypes.COUNT_FILTER_INPUT),
  ...base.getActions('Keywords', actionTypes.KEYWORDS),
  ...array.getActions('ReplayDialogues', actionTypes.REPLAY_DIALOGUES),
  ...array.getActions('SavedKeywords', actionTypes.SAVED_KEYWORDS),
  ...base.getActions('KuromojiProgress', actionTypes.KUROMOJI_PROGRESS),
  ...base.getActions('KeywordManipulatePanel', actionTypes.KEYWORD_MANIPULATE_PANEL),
  toggleKeywordUse: keyword => ({
    type: actionTypes.KEYWORDS_TOGGLE,
    payload: {
      keyword,
    },
  }),
  setKeywordsUseMinCount: count => ({
    type: actionTypes.KEYWORDS_USEMINCOUNT,
    payload: {
      count,
    },
  }),
};

export const rootSelector = state => state[scope];

export const initialState = {
  /* {
   *   keyword: {
   *     count,  // Count of appearance of the keyword
   *     use,  // Whether to use the keyword
   *   }
   * }
   */
  keywords: {},
  countFilterInput: 0,
  replayDialogues: [], // Array of {qustion: String!, keywords: [String!]!}
  /* Array of {
   *   name: String!,
   *   keywords,
   * }
   */
  savedKeywords: [],
  kuromojiProgress: 0,
  keywordManipulatePanel: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.KEYWORDS:
      return {
        ...state,
        keywords: base.helper(state.keywords, action.payload),
      };
    case actionTypes.COUNT_FILTER_INPUT:
      return {
        ...state,
        countFilterInput: base.helper(state.keywords, action.payload),
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
        keywordManipulatePanel: base.helper(state.KeywordManipulatePanel, action.payload),
      }
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
