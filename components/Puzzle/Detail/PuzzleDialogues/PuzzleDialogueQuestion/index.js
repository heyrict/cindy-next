import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { QuestionModes } from './constants';
import QuestionDisplay from './QuestionDisplay';
import QuestionModeSelector from './QuestionModeSelector';

export const PuzzleDialogueQuestion = ({
  dialogueId,
  question,
  user,
  userId,
  questionEditTimes,
  puzzleStatus,
}) => {
  return puzzleStatus === 0 && userId === user.id ? (
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

PuzzleDialogueQuestion.propTypes = {
  dialogueId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  userId: PropTypes.number.isRequired,
  question: PropTypes.string,
  questionEditTimes: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDialogueQuestion);
