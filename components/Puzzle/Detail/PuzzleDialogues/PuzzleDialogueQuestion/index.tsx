import React from 'react';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import QuestionDisplay from './QuestionDisplay';
import QuestionModeSelector from './QuestionModeSelector';

import { StateType } from 'reducers/types';
import { PuzzleDialogueQuestionProps } from './types';

export const PuzzleDialogueQuestion = ({
  dialogueId,
  question,
  user,
  userId,
  questionEditTimes,
  puzzleStatus,
  isAnswered,
}: PuzzleDialogueQuestionProps) => {
  return !isAnswered && puzzleStatus === 0 && userId === user.id ? (
    <QuestionModeSelector
      dialogueId={dialogueId}
      question={question}
      questionEditTimes={questionEditTimes}
    />
  ) : (
    <QuestionDisplay
      question={question}
      questionEditTimes={questionEditTimes}
    />
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDialogueQuestion);
