import React, { useState, useEffect } from 'react';

import { ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { AnswerModes } from './constants';
import { ClearFix } from './components';
import AnswerDisplay from './AnswerDisplay';
import AnswerEdit from './AnswerEdit';

import { AnswerModeSelectorProps } from './types';

const AnswerModeSelector = ({
  dialogueId,
  answer,
  answerEditTimes,
  answeredtime,
  trueAns,
  goodAns,
  puzzleStatus,
}: AnswerModeSelectorProps) => {
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
          answeredtime={answeredtime}
          dialogueId={dialogueId}
          setMode={setMode}
          puzzleStatus={puzzleStatus}
        />
      );
    default:
      return null;
  }
};

export default AnswerModeSelector;
