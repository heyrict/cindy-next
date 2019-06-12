import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { ClearFix } from './components';
import AnswerModeSelector from './AnswerModeSelector';
import AnswerDisplay from './AnswerDisplay';

const PuzzleDialogueAnswer = ({
  dialogueId,
  answer,
  answerEditTimes,
  goodAns,
  trueAns,
  user,
  puzzleUserId,
  puzzleStatus,
}) => {
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

PuzzleDialogueAnswer.propTypes = {
  dialogueId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  puzzleUserId: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
  answer: PropTypes.string,
  answerEditTimes: PropTypes.number.isRequired,
  goodAns: PropTypes.bool.isRequired,
  trueAns: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDialogueAnswer);
