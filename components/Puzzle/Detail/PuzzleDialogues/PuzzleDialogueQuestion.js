import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { line2md } from 'common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedTime, FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Mutation } from 'react-apollo';
import { EditQuestionMutation } from 'graphql/Mutations/Dialogue';

import {
  Flex,
  Box,
  ButtonTransparent,
  EditTimeSpan,
  Img,
  Textarea,
} from 'components/General';
import pencilIcon from 'svgs/pencil.svg';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

const QuestionModes = {
  DISPLAY: Symbol('display'),
  EDIT: Symbol('edit'),
};

const QuestionDisplay = ({ question, questionEditTimes }) => {
  return (
    <React.Fragment>
      <span dangerouslySetInnerHTML={{ __html: line2md(question) }} />
      {questionEditTimes > 0 && (
        <EditTimeSpan>
          <FormattedMessage
            {...commonMessages.editTimes}
            values={{ count: questionEditTimes }}
          />
        </EditTimeSpan>
      )}
    </React.Fragment>
  );
};

const QuestionEdit = ({ question, dialogueId, setMode }) => {
  const [text, setText] = useState(question);
  useEffect(() => {
    setText(question);
  }, [question]);

  return (
    <Mutation mutation={EditQuestionMutation}>
      {editQuestion => (
        <React.Fragment>
          <Textarea
            width={1}
            ml={-1}
            borderWidth="2px"
            borderColor="red.7"
            borderStyle="solid"
            bg="red.0"
            onChange={e => setText(e.target.value)}
            value={text}
          />
          <Flex
            width={1}
            borderWidth="3px"
            borderColor="red.7"
            borderStyle="solid"
          >
            <ButtonTransparent
              width={1}
              p={1}
              borderLeft={0}
              borderTop={0}
              borderRight="3px"
              borderBottom={0}
              borderColor="red.7"
              borderStyle="solid"
              onClick={() => setMode(QuestionModes.DISPLAY)}
            >
              <Img size="xs" src={crossIcon} />
            </ButtonTransparent>
            <ButtonTransparent
              width={1}
              p={1}
              onClick={() => {
                const newQuestion = text.trimRight();
                if (newQuestion === question.trimRight()) {
                  setMode(QuestionModes.DISPLAY);
                } else {
                  editQuestion({
                    variables: {
                      dialogueId,
                      question: newQuestion,
                    },
                  })
                    .then(() => {
                      setMode(QuestionModes.DISPLAY);
                    })
                    .catch(error => {
                      console.log(error.message);
                    });
                }
              }}
            >
              <Img size="xs" src={tickIcon} />
            </ButtonTransparent>
          </Flex>
        </React.Fragment>
      )}
    </Mutation>
  );
};

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

const PuzzleDialogueQuestion = ({
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
