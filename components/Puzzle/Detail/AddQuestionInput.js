import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Flex, Box, Input, Textarea, Img, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import expand from 'svgs/expand.svg';
import messages from 'messages/pages/puzzle';

import { Mutation } from 'react-apollo';
import { AddQuestionMutation } from 'graphql/Mutations/Puzzle';
import { DialogueHintQuery } from 'graphql/Queries/Dialogues';

import { upsertItem } from 'common';
import { widthSplits } from './constants';

const ExpandButton = styled(Button)`
  background-color: transparent;
  &:hover {
    background-color: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

const AddQuestionInput = ({ puzzleId }) => {
  let [input, setInput] = useState('');
  let [expanded, setExpanded] = useState(false);
  const PuzzleInput = expanded ? Textarea : Input;
  return (
    <Mutation
      mutation={AddQuestionMutation}
      update={(cache, { data }) => {
        if (
          !data ||
          !data.insert_sui_hei_dialogue ||
          data.insert_sui_hei_dialogue.returning.length !== 1
        )
          return;
        const { sui_hei_dialogue, sui_hei_hint } = cache.readQuery({
          query: DialogueHintQuery,
          variables: {
            puzzleId,
          },
        });
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
      {addQuestion => (
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
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.nativeEvent.keyCode === 13 && !expanded) {
                addQuestion({
                  variables: {
                    question: input,
                    puzzleId,
                  },
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
              addQuestion({
                variables: {
                  question: input,
                  puzzleId,
                },
              });
              setInput('');
            }}
            px={2}
            minWidth="50px"
          >
            <FormattedMessage {...messages.putQuestion} />
          </Button>
        </Flex>
      )}
    </Mutation>
  );
};

export default AddQuestionInput;
