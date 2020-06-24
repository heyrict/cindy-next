import {
  findNodeWithPath,
  nodeVisible,
  matchesClue,
} from 'components/Workbench/Keyword/common';

import { createSelector } from 'reselect';
import * as replayReducer from 'reducers/replay';

import { StateType } from 'reducers/types';

export const treeLoadedSelector = createSelector(
  (state: StateType) => replayReducer.rootSelector(state).tree,
  tree => tree !== undefined,
);

export const currentNodeSelector = createSelector(
  (state: StateType) => replayReducer.rootSelector(state).tree,
  (state: StateType) => replayReducer.rootSelector(state).path,
  (tree, path) => (tree ? findNodeWithPath(tree, path) : undefined),
);

export const keywordsSelector = createSelector(
  (state: StateType) => currentNodeSelector(state),
  (state: StateType) => replayReducer.rootSelector(state).clues,
  (currentNode, clues) =>
    currentNode
      ? currentNode.children
          .filter(node => nodeVisible(node, clues))
          .map(node => node.name)
      : undefined,
);

export const leavesSelector = createSelector(
  (state: StateType) => currentNodeSelector(state),
  (state: StateType) => replayReducer.rootSelector(state).clues,
  (currentNode, clues) =>
    currentNode
      ? currentNode.leaves.filter(leaf => matchesClue(leaf, clues))
      : undefined,
);
