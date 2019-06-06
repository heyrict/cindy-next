import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import { Box } from 'components/General';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { constructTree, filterDialogueKeywords } from './common';

const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false,
});

const dialogueSelector = createSelector(
  state => addReplayReducer.rootSelector(state).replayDialogues,
  state => addReplayReducer.rootSelector(state).keywords,
  (dialogues, keywords) => filterDialogueKeywords(dialogues, keywords),
);

const treeSelector = createSelector(
  state => dialogueSelector(state),
  dialogues => constructTree(dialogues, d => d.question_keywords),
);

const ResultPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: solid;
  padding: ${p => p.theme.space[2]}px;
  width: 100%;
  height: 400px;
  margin-bottom: ${p => p.theme.space[2]}px;
`;

const ResultPreview = ({ keywordTree }) => {
  return (
    <ResultPanel>
      <Tree
        transitionDuration={0}
        data={keywordTree}
        depthFactor={0}
        scaleExtent={{
          min: 1,
          max: 1,
        }}
        nodeSize={{
          x: 100,
          y: 40,
        }}
        textLayout={{
          x: 0,
          y: -15,
        }}
      />
    </ResultPanel>
  );
};

const mapStateToProps = state => ({
  keywordTree: treeSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(ResultPreview);
