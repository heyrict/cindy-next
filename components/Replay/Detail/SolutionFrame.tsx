import React from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import Box from 'components/General/Box';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import ReplayPlay from './ReplayPlay';

import { StateType } from 'reducers/types';
import { SolutionFrameProps } from './types';

const SolutionFrame = ({ replay, timeSolved }: SolutionFrameProps) =>
  timeSolved ? (
    <ContentsFrame
      text={replay.sui_hei_puzzle ? replay.sui_hei_puzzle.content : ''}
      user={replay.sui_hei_user}
      solved={timeSolved}
    />
  ) : (
    <Box width={1}>
      <ReplayPlay milestones={replay.milestones} />
    </Box>
  );

const mapStateToProps = (state: StateType) => ({
  timeSolved: replayReducer.rootSelector(state).timeSolved,
});

const withRedux = connect(mapStateToProps);

export default withRedux(SolutionFrame);
