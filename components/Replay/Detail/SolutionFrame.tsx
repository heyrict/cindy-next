import React from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import { SolutionFrameProps } from './types';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';

import { StateType } from 'reducers/types';

const SolutionFrame = ({ replay, timeSolved }: SolutionFrameProps) =>
  timeSolved ? (
    <ContentsFrame
      text={replay.sui_hei_puzzle ? replay.sui_hei_puzzle.content : ''}
      user={replay.sui_hei_user}
      solved={timeSolved}
    />
  ) : null;

const mapStateToProps = (state: StateType) => ({
  timeSolved: replayReducer.rootSelector(state).timeSolved,
});

const withRedux = connect(mapStateToProps);

export default withRedux(SolutionFrame);
