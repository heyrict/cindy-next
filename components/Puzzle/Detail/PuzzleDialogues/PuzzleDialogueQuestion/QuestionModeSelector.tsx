import React, { useState } from 'react';

import { ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { QuestionModes } from './constants';
import QuestionDisplay from './QuestionDisplay';
import QuestionEdit from './QuestionEdit';

import { QuestionModeSelectorProps } from './types';

const QuestionModeSelector = ({
  question,
  questionEditTimes,
  dialogueId,
}: QuestionModeSelectorProps) => {
  const [mode, setMode] = useState(QuestionModes.DISPLAY);
  switch (mode) {
    case QuestionModes.DISPLAY:
      return (
        <React.Fragment>
          <QuestionDisplay
            question={question}
            questionEditTimes={questionEditTimes}
          />
          <ButtonTransparent onClick={() => setMode(QuestionModes.EDIT)}>
            <Img size="1em" src={pencilIcon} alt="edit" />
          </ButtonTransparent>
        </React.Fragment>
      );
    case QuestionModes.EDIT:
      return (
        <QuestionEdit
          question={question}
          dialogueId={dialogueId}
          setMode={setMode}
        />
      );
    default:
      return null;
  }
};

export default QuestionModeSelector;
