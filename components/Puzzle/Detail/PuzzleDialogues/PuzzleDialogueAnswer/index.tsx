import React from 'react';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { ClearFix } from './components';
import AnswerModeSelector from './AnswerModeSelector';
import AnswerDisplay from './AnswerDisplay';

import { StateType } from 'reducers/types';
import { PuzzleDialogueAnswerProps } from './types';

const PuzzleDialogueAnswer = ({
  dialogueId,
  answer,
  answerEditTimes,
  goodAns,
  trueAns,
  user,
  puzzleUserId,
  puzzleStatus,
}: PuzzleDialogueAnswerProps) => {
  return puzzleUserId === user.id ? (
    <AnswerModeSelector
      dialogueId={dialogueId}
      answer={answer}
      answerEditTimes={answerEditTimes}
      trueAns={trueAns}
      goodAns={goodAns}
      puzzleStatus={puzzleStatus}
    />
  ) : (
    <React.Fragment>
      <AnswerDisplay
        answer={answer}
        answerEditTimes={answerEditTimes}
        goodAns={goodAns}
        trueAns={trueAns}
      />
      <ClearFix />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDialogueAnswer);
