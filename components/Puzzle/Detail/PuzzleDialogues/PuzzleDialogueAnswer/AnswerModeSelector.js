import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { AnswerModes } from './constants';
import { ClearFix } from './components';
import AnswerDisplay from './AnswerDisplay';
import AnswerEdit from './AnswerEdit';

const AnswerModeSelector = ({
  dialogueId,
  answer,
  answerEditTimes,
  trueAns,
  goodAns,
  puzzleStatus,
}) => {
  const [mode, setMode] = useState(
    answer === '' ? AnswerModes.EDIT : AnswerModes.DISPLAY,
  );
  useEffect(() => {
    setMode(answer === '' ? AnswerModes.EDIT : AnswerModes.DISPLAY);
  }, [answer]);

  switch (mode) {
    case AnswerModes.DISPLAY:
      return (
        <React.Fragment>
          <AnswerDisplay
            answer={answer}
            answerEditTimes={answerEditTimes}
            trueAns={trueAns}
            goodAns={goodAns}
          />
          {puzzleStatus === 0 && (
            <ButtonTransparent onClick={() => setMode(AnswerModes.EDIT)}>
              <Img size="1em" src={pencilIcon} />
            </ButtonTransparent>
          )}
          <ClearFix />
        </React.Fragment>
      );
    case AnswerModes.EDIT:
      return (
        <AnswerEdit
          answer={answer}
          goodAns={goodAns}
          trueAns={trueAns}
          dialogueId={dialogueId}
          setMode={setMode}
          puzzleStatus={puzzleStatus}
        />
      );
    default:
      return null;
  }
};

AnswerModeSelector.propTypes = {
  dialogueId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  answerEditTimes: PropTypes.number.isRequired,
  trueAns: PropTypes.bool.isRequired,
  goodAns: PropTypes.bool.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
};

export default AnswerModeSelector;
