import * as bool from './helpers/bool';
import * as base from './helpers/base';
import * as array from './helpers/array';

export const scope = 'addReplay';

export const actionTypes = {
  KEYWORDS: `${scope}.KEYWORDS`,
  KEYWORDS_TOGGLE: `${scope}.KEYWORDS_TOGGLE`,
  REPLAY_DIALOGUES: `${scope}.REPLAY_DIALOGUES`,
  KUROMOJI_PROGRESS: `${scope}.KUROMOJI_PROGRESS`,
};

export const actions = {
  ...base.getActions('Keywords', actionTypes.KEYWORDS),
  toggleKeywordUse: keyword => ({
    type: actionTypes.KEYWORDS_TOGGLE,
    payload: {
      keyword,
    },
  }),
  ...array.getActions('ReplayDialogues', actionTypes.REPLAY_DIALOGUES),
  ...base.getActions('KuromojiProgress', actionTypes.KUROMOJI_PROGRESS),
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
  replayDialogues: [], // Array of {qustion: String!, keywords: [String!]!}
  kuromojiProgress: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.KEYWORDS:
      return {
        ...state,
        keywords: base.helper(state.keywords, action.payload),
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
    case actionTypes.REPLAY_DIALOGUES:
      return {
        ...state,
        replayDialogues: array.helper(state.replayDialogues, action.payload),
      };
    case actionTypes.KUROMOJI_PROGRESS:
      return {
        ...state,
        kuromojiProgress: base.helper(state.kuromojiProgress, action.payload),
      };
    default:
      return state;
  }
};
