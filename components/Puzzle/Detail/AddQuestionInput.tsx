import React, { useState } from 'react';
import styled from 'theme/styled';

import { Flex, Input, Textarea, Img, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import expand from 'svgs/expand.svg';
import messages from 'messages/pages/puzzle';

import { Mutation, MutationFn } from 'react-apollo';
import { ADD_QUESTION_MUTATION } from 'graphql/Mutations/Dialogue';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';

import { upsertItem } from 'common';
import { widthSplits } from './constants';

import { DataProxy } from 'apollo-cache/lib/types/DataProxy';
import { FetchResult } from 'apollo-link/lib/types';
import { QuestionInputWidgetProps, AddQuestionInputProps } from './types';
import {
  AddQuestionMutation,
  AddQuestionMutationVariables,
} from 'graphql/Mutations/generated/AddQuestionMutation';

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
            onSubmit(input);
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
    <Mutation
      mutation={ADD_QUESTION_MUTATION}
      update={(cache: DataProxy, { data }: FetchResult) => {
        if (
          !data ||
          !data.insert_sui_hei_dialogue ||
          data.insert_sui_hei_dialogue.returning.length !== 1
        )
          return;
        const { sui_hei_dialogue = undefined, sui_hei_hint = undefined } =
          cache.readQuery({
            query: DIALOGUE_HINT_QUERY,
            variables: {
              puzzleId,
              userId,
            },
          }) || {};
        const newItem = data.insert_sui_hei_dialogue.returning[0];
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
      }}
    >
      {(
        addQuestion: MutationFn<
          AddQuestionMutation,
          AddQuestionMutationVariables
        >,
      ) => (
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
                      id: puzzleId,
                      qno: -1,
                      good: false,
                      true: false,
                      question: input,
                      questionEditTimes: 0,
                      answer: '',
                      answerEditTimes: 0,
                      created: new Date().toISOString,
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
