import React from 'react';

import { ReplayDetailProps } from 'components/Replay/Detail/types';

import Box from 'components/General/Box';
import Flex from 'components/General/Flex';
import Img from 'components/General/Img';
import { PuzzleTitleBase } from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import ReplayPlay from './ReplayPlay';
import replayIcon from 'svgs/puzzleDetailReplay.svg';

const ReplayDetail = ({ replay }: ReplayDetailProps) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
    <PuzzleTitleBase>
      <Img height="sm" mr={2} src={replayIcon} />
      {replay.title}
    </PuzzleTitleBase>
    <ContentsFrame
      text={replay.sui_hei_puzzle ? replay.sui_hei_puzzle.content : ''}
      user={replay.sui_hei_user}
      created={replay.created}
    />
    <Box width={1}>
      <ReplayPlay />
    </Box>
  </Flex>
);

export default ReplayDetail;
