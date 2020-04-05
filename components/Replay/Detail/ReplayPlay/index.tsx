import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as replayReducer from 'reducers/replay';

import Flex from 'components/General/Flex';
import ReplayPathSelect from './ReplayPathSelect';
import ReplayKeywordSelect from './ReplayKeywordSelect';

import { ReplayPlayProps } from './types';
import { StateType } from 'reducers/types';

const ReplayPlay = ({ treeLoaded }: ReplayPlayProps) =>
  treeLoaded ? (
    <Flex mx={2} flexWrap="wrap">
      <ReplayPathSelect />
      <ReplayKeywordSelect />
    </Flex>
  ) : null;

const treeLoadedSelector = createSelector(
  (state: StateType) => replayReducer.rootSelector(state).tree,
  tree => tree !== undefined,
);

const mapStateToProps = (state: StateType) => ({
  treeLoaded: treeLoadedSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(ReplayPlay);
