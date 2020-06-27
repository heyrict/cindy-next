import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import Flex from 'components/General/Flex';
import Img from 'components/General/Img';
import { PuzzleTitleBase } from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import ReplayLogs from './ReplayLogs';
import SolutionFrame from './SolutionFrame';
import replayIcon from 'svgs/puzzleDetailReplay.svg';

import { ReplayDetailProps } from './types';
import { ActionContentType, ReplayDialogueType } from 'reducers/types';

const ReplayDetail = ({ replay, constructTree }: ReplayDetailProps) => {
  // construct tree
  useEffect(() => {
    constructTree(
      replay.replay_dialogues.map(d => ({
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
        text={replay.puzzle ? replay.puzzle.content : ''}
        user={replay.user}
        created={replay.created}
      />
      <ReplayLogs dialogues={replay.replay_dialogues} />
      <SolutionFrame replay={replay} />
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
