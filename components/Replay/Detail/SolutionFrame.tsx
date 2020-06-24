import React from 'react';
import { widthSplits } from 'components/Puzzle/Detail/constants';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage } from 'react-intl';
import replayMessages from 'messages/components/replay';

import Box from 'components/General/Box';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import { PuzzleBrief } from 'components/Puzzle/Brief';
import ReplayPlay from './ReplayPlay';

import { StateType } from 'reducers/types';
import { SolutionFrameProps } from './types';

const SolutionFrame = ({
  replay,
  timeSolved,
  puzzleGenreImg,
}: SolutionFrameProps) =>
  timeSolved ? (
    <>
      <ContentsFrame
        text={replay.sui_hei_puzzle ? replay.sui_hei_puzzle.solution : ''}
        user={replay.sui_hei_user}
        solved={timeSolved}
      />
      <Box width={1} mx={widthSplits[2]} mt={2}>
        <Box width={1}>
          <FormattedMessage {...replayMessages.original} />
        </Box>
        {replay.sui_hei_puzzle && (
          <PuzzleBrief
            showGenreImage={puzzleGenreImg}
            puzzle={replay.sui_hei_puzzle}
          />
        )}
      </Box>
    </>
  ) : (
    <Box width={1}>
      <ReplayPlay milestones={replay.milestones} />
    </Box>
  );

const mapStateToProps = (state: StateType) => ({
  timeSolved: replayReducer.rootSelector(state).timeSolved,
  puzzleGenreImg: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(SolutionFrame);
