import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Flex, Input, Textarea, Img, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import expand from 'svgs/expand.svg';
import messages from 'messages/pages/puzzle';

import { Mutation, MutationFn } from 'react-apollo';
import { AddQuestionMutation } from 'graphql/Mutations/Dialogue';
import { DialogueHintQuery } from 'graphql/Queries/Dialogues';

import { upsertItem } from 'common';
import { widthSplits } from './constants';

import { DataProxy } from 'apollo-cache/lib/types/DataProxy';
import { FetchResult } from 'apollo-link/lib/types';
import { QuestionInputWidgetProps, AddQuestionInputProps } from './types';

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
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

const AddQuestionInput = ({ puzzleId }: AddQuestionInputProps) => {
  return (
    <Mutation
      mutation={AddQuestionMutation}
      update={(cache: DataProxy, { data }: FetchResult) => {
        if (
          !data ||
          !data.insert_sui_hei_dialogue ||
          data.insert_sui_hei_dialogue.returning.length !== 1
        )
          return;
        const { sui_hei_dialogue = undefined, sui_hei_hint = undefined } =
          cache.readQuery({
            query: DialogueHintQuery,
            variables: {
              puzzleId,
            },
          }) || {};
        const newItem = data.insert_sui_hei_dialogue.returning[0];
        console.log(newItem, data, sui_hei_dialogue, sui_hei_hint);
        cache.writeQuery({
          query: DialogueHintQuery,
          variables: {
            puzzleId,
          },
          data: {
            sui_hei_hint,
            sui_hei_dialogue: upsertItem(sui_hei_dialogue, newItem),
          },
        });
      }}
    >
      {(addQuestion: MutationFn) => (
        <QuestionInputWidget
          onSubmit={input =>
            addQuestion({
              variables: {
                question: input,
                puzzleId,
              },
            })
          }
        />
      )}
    </Mutation>
  );
};

export default AddQuestionInput;
