import React, { useState, useEffect } from 'react';

import { ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { AnswerModes } from './constants';
import { ClearFix } from './components';
import AnswerDisplay from './AnswerDisplay';
import AnswerEdit from './AnswerEdit';

import { AnswerModeSelectorProps } from './types';
import {Status} from 'generated/globalTypes';

const AnswerModeSelector = ({
  dialogueId,
  answer,
  answerEditTimes,
  answeredTime,
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
          {puzzleStatus === Status.UNDERGOING && (
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
          answeredTime={answeredTime}
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
