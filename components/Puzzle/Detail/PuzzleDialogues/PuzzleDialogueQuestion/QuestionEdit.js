import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { EditQuestionMutation } from 'graphql/Mutations/Dialogue';

import { Flex, ButtonTransparent, Img, Textarea } from 'components/General';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { QuestionModes } from './constants';

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
                      console.log(error);
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

export default QuestionEdit;
