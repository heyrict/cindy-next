import React from 'react';

import { ReplayDetailProps } from 'components/Replay/Detail/types';

import Box from 'components/General/Box';
import Flex from 'components/General/Flex';
import { PuzzleTitleBase } from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import ReplayPlay from './ReplayPlay';

const ReplayDetail = ({ replay }: ReplayDetailProps) => (
  <Flex flexWrap="wrap" justifyContent="center">
    <PuzzleTitleBase>{replay.title}</PuzzleTitleBase>
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
