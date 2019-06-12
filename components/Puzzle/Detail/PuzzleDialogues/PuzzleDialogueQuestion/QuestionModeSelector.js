import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { QuestionModes } from './constants';
import QuestionDisplay from './QuestionDisplay';
import QuestionEdit from './QuestionEdit';

const QuestionModeSelector = ({ question, questionEditTimes, dialogueId }) => {
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
            <Img size="1em" src={pencilIcon} />
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

QuestionModeSelector.propTypes = {
  question: PropTypes.string.isRequired,
  questionEditTimes: PropTypes.number.isRequired,
  dialogueId: PropTypes.number.isRequired,
};

export default QuestionModeSelector;
