import React, { useState } from 'react';
import styled from 'theme/styled';

import { Flex, Input, Textarea, Img, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import expand from 'svgs/expand.svg';
import messages from 'messages/pages/puzzle';

import { Mutation } from 'react-apollo';
import { ADD_QUESTION_MUTATION } from 'graphql/Mutations/Dialogue';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';

import { upsertItem } from 'common';
import { widthSplits } from './constants';

import { QuestionInputWidgetProps, AddQuestionInputProps } from './types';
import {
  AddQuestionMutation,
  AddQuestionMutationVariables,
} from 'graphql/Mutations/generated/AddQuestionMutation';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';

export const ExpandButton = styled(Button)`
  background-color: transparent;
  &:hover {
    background-color: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

export const QuestionInputWidget = ({ onSubmit }: QuestionInputWidgetProps) => {
  let [input, setInput] = useState('');
  let [expanded, setExpanded] = useState(false);
  const PuzzleInput = expanded ? Textarea : Input;
  return (
    <Flex
      width={1}
      mx={widthSplits[1]}
      my={2}
      borderRadius={1}
      borderStyle="solid"
      borderColor="orange.6"
      borderWidth={2}
      bg="orange.1"
    >
      <PuzzleInput
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => setInput(e.target.value)}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.nativeEvent.keyCode === 13 && !expanded) {
            onSubmit(input)
              .then(() => {
                setInput('');
              })
              .catch(e => {
                console.log(e);
                setInput(input);
              });
            setInput('');
          }
        }}
        value={input}
        border="none"
        bg="transparent"
      />
      <ExpandButton onClick={() => setExpanded(!expanded)} bg="transparent">
        <Img size="xs" src={expand} />
      </ExpandButton>
      <Button
        onClick={() => {
          onSubmit(input);
          setInput('');
        }}
        px={2}
        minWidth="50px"
      >
        <FormattedMessage {...messages.putQuestion} />
      </Button>
    </Flex>
  );
};

const AddQuestionInput = ({ puzzleId, userId }: AddQuestionInputProps) => {
  return (
    <Mutation<AddQuestionMutation, AddQuestionMutationVariables>
      mutation={ADD_QUESTION_MUTATION}
      update={(cache, { data }) => {
        if (
          !data ||
          !data.insert_sui_hei_dialogue ||
          data.insert_sui_hei_dialogue.returning.length !== 1
        )
          return;
        const prevDialogueHints = cache.readQuery<
          DialogueHintQuery,
          DialogueHintQueryVariables
        >({
          query: DIALOGUE_HINT_QUERY,
          variables: {
            puzzleId,
            userId,
          },
        });
        if (!prevDialogueHints) return;
        const { sui_hei_hint, sui_hei_dialogue } = prevDialogueHints;
        const newItem = data.insert_sui_hei_dialogue.returning[0];
        if (newItem.id === -1) {
          cache.writeQuery({
            query: DIALOGUE_HINT_QUERY,
            variables: {
              puzzleId,
              userId,
            },
            data: {
              sui_hei_hint,
              sui_hei_dialogue: [...sui_hei_dialogue, newItem],
            },
          });
        } else {
          cache.writeQuery({
            query: DIALOGUE_HINT_QUERY,
            variables: {
              puzzleId,
              userId,
            },
            data: {
              sui_hei_hint,
              sui_hei_dialogue: upsertItem(sui_hei_dialogue, newItem),
            },
          });
        }
      }}
    >
      {addQuestion => (
        <QuestionInputWidget
          onSubmit={input =>
            addQuestion({
              variables: {
                question: input,
                puzzleId,
              },
              optimisticResponse: {
                insert_sui_hei_dialogue: {
                  __typename: 'sui_hei_dialogue_mutation_response',
                  returning: [
                    {
                      __typename: 'sui_hei_dialogue',
                      id: -1,
                      qno: -1,
                      good: false,
                      true: false,
                      question: input,
                      questionEditTimes: 0,
                      answer: '',
                      answerEditTimes: 0,
                      created: Date.now(),
                      answeredtime: null,
                      sui_hei_user: {
                        __typename: 'sui_hei_user',
                        id: -1,
                        nickname: '...',
                        username: '...',
                        sui_hei_current_useraward: null,
                      },
                    },
                  ],
                },
              },
            })
          }
        />
      )}
    </Mutation>
  );
};

export default AddQuestionInput;
