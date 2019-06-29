import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from 'react-apollo';
import { EDIT_QUESTION_MUTATION } from 'graphql/Mutations/Dialogue';

import { Flex, ButtonTransparent, Img, Textarea } from 'components/General';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { QuestionModes } from './constants';
import { QuestionEditProps } from './types';
import {
  EditQuestionMutation,
  EditQuestionMutationVariables,
} from 'graphql/Mutations/generated/EditQuestionMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';

const QuestionEdit = ({ question, dialogueId, setMode }: QuestionEditProps) => {
  const [text, setText] = useState(question);
  useEffect(() => {
    setText(question);
  }, [question]);

  return (
    <Mutation<EditQuestionMutation, EditQuestionMutationVariables>
      mutation={EDIT_QUESTION_MUTATION}
    >
      {editQuestion => (
        <React.Fragment>
          <Textarea
            width={1}
            ml={-1}
            borderWidth="2px"
            borderColor="red.7"
            borderStyle="solid"
            bg="red.0"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
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
                    optimisticResponse: {
                      update_sui_hei_dialogue: {
                        __typename: 'sui_hei_dialogue_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_dialogue',
                            id: dialogueId,
                            question: newQuestion,
                            questionEditTimes: 0,
                          },
                        ],
                      },
                    },
                  })
                    .then(result => {
                      if (!result) return;
                      const { errors } = result;
                      if (errors) {
                        toast.error(JSON.stringify(errors));
                        setMode(QuestionModes.EDIT);
                        setText(question);
                      }
                    })
                    .catch((error: ApolloError) => {
                      toast.error(error.message);
                      setMode(QuestionModes.EDIT);
                      setText(question);
                    });
                  setMode(QuestionModes.DISPLAY);
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
