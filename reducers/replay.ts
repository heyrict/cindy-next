import * as base from './helpers/base';

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
  // Signals
  CONSTRUCT_TREE = 'replay.CONSTRUCT_TREE',
}

export type ActionPayloadType = {
  TREE: ReturnType<ValueOf<base.HelperActionType<TreeType>>>;
  CONSTRUCT_TREE: { dialogues: Array<ReplayDialogueType> };
};

export const actions = {
  tree: base.wrapActions<TreeType>(actionTypes.TREE),
  // Signals
  constructTree: (dialogues: Array<ReplayDialogueType>) => ({
    type: actionTypes.CONSTRUCT_TREE,
    dialogues,
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  tree: undefined,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
) => {
  switch (action.type) {
    case actionTypes.TREE:
      return {
        ...state,
        tree: base.helper(state.tree, action.payload),
      };
  }
};
