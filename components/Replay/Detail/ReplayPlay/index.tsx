import React from 'react';

import { connect } from 'react-redux';
import { treeLoadedSelector } from './selectors';

import Flex from 'components/General/Flex';
import ReplayPathSelect from './ReplayPathSelect';
import ReplayKeywordSelect from './ReplayKeywordSelect';
import ReplayLeafSelect from './ReplayLeafSelect';
import ReplayCluesDisplay from './ReplayCluesDisplay';

import { ReplayPlayProps } from './types';
import { StateType } from 'reducers/types';

const ReplayPlay = ({ treeLoaded, milestones }: ReplayPlayProps) =>
  treeLoaded ? (
    <Flex mx={2} flexWrap="wrap">
      <ReplayCluesDisplay milestones={milestones} />
      <ReplayPathSelect />
      <ReplayKeywordSelect />
      <ReplayLeafSelect />
    </Flex>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  treeLoaded: treeLoadedSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(ReplayPlay);
