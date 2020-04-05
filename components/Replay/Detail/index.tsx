import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import Box from 'components/General/Box';
import Flex from 'components/General/Flex';
import Img from 'components/General/Img';
import { PuzzleTitleBase } from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import ReplayPlay from './ReplayPlay';
import ReplayLogs from './ReplayLogs';
import replayIcon from 'svgs/puzzleDetailReplay.svg';

import { ReplayDetailProps } from './types';
import { ActionContentType, ReplayDialogueType } from 'reducers/types';

const ReplayDetail = ({ replay, constructTree }: ReplayDetailProps) => {
  // construct tree
  useEffect(() => {
    constructTree(
      replay.sui_hei_replay_dialogues.map(d => ({
        id: d.id,
        question: d.question,
        answer: d.answer,
        good: d.good,
        true: d.true,
        milestones: d.milestones,
        dependency: d.dependency,
        question_keywords: d.keywords.map((name: string) => ({ name })),
      })),
    );
  }, [replay.id]);

  return (
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
      <ReplayLogs dialogues={replay.sui_hei_replay_dialogues} />
      <Box width={1}>
        <ReplayPlay />
      </Box>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  constructTree: (dialogues: Array<ReplayDialogueType>) =>
    dispatch(replayReducer.actions.constructTree(dialogues)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(ReplayDetail);
