import * as base from './helpers/base';
import * as array from './helpers/array';

import {
  KeywordTreeNodeType,
  KeywordTreeLeafType,
} from 'components/Workbench/Keyword/types';
import {
  ValueOf,
  StateType,
  ActionContentType,
  ReplayDialogueType,
} from './types';

export const scope = 'replay';

type TreeType = KeywordTreeNodeType<KeywordTreeLeafType> | undefined;

export enum actionTypes {
  TREE = 'replay.TREE',
  PATH = 'replay.PATH',
  CLUES = 'replay.CLUES',
  LOGS = 'replay.LOGS',
  TIME_SOLVED = 'replay.TIME_SOLVED',
  RESET = 'replay.RESET',
  // Signals
  CONSTRUCT_TREE = 'replay.CONSTRUCT_TREE',
}

export type ActionPayloadType = {
  TREE: ReturnType<ValueOf<base.HelperActionType<TreeType>>>;
  PATH: ReturnType<ValueOf<array.HelperActionType<string>>>;
  CLUES: ReturnType<ValueOf<array.HelperActionType<string>>>;
  TIME_SOLVED: ReturnType<ValueOf<base.HelperActionType<string | undefined>>>;
  RESET: undefined;
  CONSTRUCT_TREE: { dialogues: Array<ReplayDialogueType> };
};

export const actions = {
  tree: base.wrapActions<TreeType>(actionTypes.TREE),
  path: array.wrapActions<string>(actionTypes.PATH),
  clues: array.wrapActions<string>(actionTypes.CLUES),
  logs: array.wrapActions<number>(actionTypes.LOGS),
  timeSolved: base.wrapActions<string>(actionTypes.TIME_SOLVED),
  reset: () => ({ type: actionTypes.RESET }),
  // Signals
  constructTree: (dialogues: Array<ReplayDialogueType>) => ({
    type: actionTypes.CONSTRUCT_TREE,
    payload: { dialogues },
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  tree: undefined as TreeType,
  path: [] as Array<string>,
  clues: [] as Array<string>,
  logs: [] as Array<number>,
  timeSolved: undefined as undefined | string,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.TREE:
      return {
        ...state,
        tree: base.helper(state.tree, action.payload),
      };
    case actionTypes.PATH:
      return {
        ...state,
        path: array.helper(state.path, action.payload),
      };
    case actionTypes.CLUES:
      return {
        ...state,
        clues: array.helper(state.clues, action.payload),
      };
    case actionTypes.LOGS:
      return {
        ...state,
        logs: array.helper(state.logs, action.payload),
      };
    case actionTypes.TIME_SOLVED:
      return {
        ...state,
        timeSolved: base.helper(state.timeSolved, action.payload),
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
