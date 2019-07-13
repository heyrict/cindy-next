import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Mutation } from 'react-apollo';
import { EDIT_ANSWER_MUTATION } from 'graphql/Mutations/Dialogue';

import {
  Flex,
  Box,
  ButtonTransparent,
  Img,
  Switch,
  Textarea,
} from 'components/General';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { AnswerModes } from './constants';
import { AnswerEditProps } from './types';
import {
  EditAnswerMutation,
  EditAnswerMutationVariables,
} from 'graphql/Mutations/generated/EditAnswerMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';

const AnswerEdit = ({
  answer,
  goodAns,
  trueAns,
  dialogueId,
  answeredtime,
  setMode,
  puzzleStatus,
}: AnswerEditProps) => {
  const [text, setText] = useState(answer);
  const [goodSwitch, setGood] = useState(goodAns);
  const [trueSwitch, setTrue] = useState(trueAns);
  useEffect(() => {
    setText(answer);
  }, [answer]);
  useEffect(() => {
    setGood(goodAns);
  }, [goodAns]);
  useEffect(() => {
    setTrue(trueAns);
  }, [trueAns]);

  return (
    <Mutation<EditAnswerMutation, EditAnswerMutationVariables>
      mutation={EDIT_ANSWER_MUTATION}
    >
      {editAnswer => (
        <Flex width={1}>
          <Flex width={1} ml={-1} mr={1} flexWrap="wrap">
            <Textarea
              width={1}
              borderWidth="2px"
              borderColor="red.7"
              borderStyle="solid"
              bg="red.0"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setText(e.target.value)
              }
              value={text}
            />
            <Box width={1 / 2}>
              <FormattedMessage {...puzzleMessages.dialogue_good} />
              <Switch
                selected={goodSwitch}
                onClick={() => setGood(!goodSwitch)}
              />
            </Box>
            <Box width={1 / 2}>
              <FormattedMessage {...puzzleMessages.dialogue_true} />
              <Switch
                selected={trueSwitch}
                onClick={() => setTrue(!trueSwitch)}
              />
            </Box>
          </Flex>
          <Flex
            width={['3em', '4em']}
            borderWidth="2px"
            borderColor="red.7"
            borderStyle="solid"
            flexDirection="column"
          >
            {puzzleStatus === 0 && answer !== '' && (
              <ButtonTransparent
                height={1}
                p={1}
                borderLeft={0}
                borderTop={0}
                borderRight={0}
                borderBottom="3px"
                borderColor="red.7"
                borderStyle="solid"
                onClick={() => setMode(AnswerModes.DISPLAY)}
              >
                <Img size="xs" src={crossIcon} />
              </ButtonTransparent>
            )}
            <ButtonTransparent
              height={1}
              p={1}
              onClick={() => {
                const oldAnswer = answer.trimRight();
                const newAnswer = text.trimRight();
                if (newAnswer === '') {
                  return;
                }
                if (
                  newAnswer === oldAnswer &&
                  goodSwitch === goodAns &&
                  trueSwitch === trueAns
                ) {
                  setMode(AnswerModes.DISPLAY);
                } else {
                  editAnswer({
                    variables: {
                      dialogueId,
                      answer: newAnswer,
                      good: goodSwitch,
                      true: trueSwitch,
                      increaseEditTimes: answer === '' ? 0 : 1,
                    },
                    optimisticResponse: {
                      update_sui_hei_dialogue: {
                        __typename: 'sui_hei_dialogue_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_dialogue',
                            id: dialogueId,
                            answer: newAnswer,
                            good: goodSwitch,
                            true: trueSwitch,
                            answerEditTimes: answer === '' ? 0 : 1,
                            answeredtime,
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
                        setMode(AnswerModes.EDIT);
                        setText(answer);
                        setGood(goodAns);
                        setTrue(trueAns);
                      }
                    })
                    .catch((error: ApolloError) => {
                      toast.error(error.message);
                      setMode(AnswerModes.EDIT);
                      setText(answer);
                      setGood(goodAns);
                      setTrue(trueAns);
                    });
                  setMode(AnswerModes.DISPLAY);
                }
              }}
            >
              <Img size="xs" src={tickIcon} />
            </ButtonTransparent>
          </Flex>
        </Flex>
      )}
    </Mutation>
  );
};

export default AnswerEdit;
