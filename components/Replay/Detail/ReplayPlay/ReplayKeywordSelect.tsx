import React from 'react';
import {
  findNodeWithPath,
  nodeVisible,
} from 'components/Workbench/Keyword/common';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as replayReducer from 'reducers/replay';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import ButtonTransparent from 'components/General/ButtonTransparent';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayKeywordSelectProps } from './types';

const currentNodeSelector = createSelector(
  (state: StateType) => replayReducer.rootSelector(state).tree,
  (state: StateType) => replayReducer.rootSelector(state).path,
  (tree, path) => (tree ? findNodeWithPath(tree, path) : undefined),
);

const keywordsSelector = createSelector(
  (state: StateType) => currentNodeSelector(state),
  (state: StateType) => replayReducer.rootSelector(state).clues,
  (currentNode, clues) =>
    currentNode
      ? currentNode.children
          .filter(node => nodeVisible(node, clues))
          .map(node => node.name)
      : undefined,
);

const ReplayKeywordSelect = ({
  keywords,
  pushKeyword,
}: ReplayKeywordSelectProps) =>
  keywords && keywords.length > 0 ? (
    <>
      <Box
        width={1}
        borderRadius="5px 5px 0 0"
        bg="indigo.7"
        px={2}
        color="indigo.1"
      >
        Keywords
      </Box>
      <Flex
        width={1}
        maxHeight="400px"
        overflowY="auto"
        border="2px solid"
        borderRadius="0 0 5px 5px"
        borderColor="indigo.7"
        mb={1}
      >
        {keywords.map(kw => (
          <ButtonTransparent key={kw} onClick={() => pushKeyword(kw)} mr={1}>
            {kw}
          </ButtonTransparent>
        ))}
      </Flex>
    </>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  keywords: keywordsSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  pushKeyword: (keyword: string) =>
    dispatch(replayReducer.actions.path.push(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayKeywordSelect);
