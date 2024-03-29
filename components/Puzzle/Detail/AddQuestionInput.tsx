import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import * as awardCheckerReducer from 'reducers/awardChecker';
import * as settingReducer from 'reducers/setting';

import { Flex, Textarea, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { ApolloError, useMutation } from '@apollo/client';
import { ADD_QUESTION_MUTATION } from 'graphql/Mutations/Dialogue';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';

import { upsertItem } from 'common/update';
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
import { SendMessageTriggerType, StateType } from 'reducers/types';

export const QuestionInputWidget = ({ onSubmit }: QuestionInputWidgetProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null!);
  const sendQuestionTrigger = useSelector(
    (state: StateType) =>
      settingReducer.rootSelector(state).sendQuestionTrigger,
  );

  const handleSubmit = () => {
    const input = editorRef.current.value;
    onSubmit(input).catch((error: ApolloError) => {
      toast.error(error.message);
      editorRef.current.value = input;
    });
    editorRef.current.value = '';
  };

  return (
    <Flex
      width={1}
      mx={widthSplits[1]}
      my={2}
      borderRadius={1}
      borderStyle="solid"
      borderColor="preset.editor.ac"
      borderWidth={2}
    >
      <Textarea
        ref={editorRef}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (sendQuestionTrigger & SendMessageTriggerType.ON_ENTER) {
            if (
              e.nativeEvent.key === 'Enter' &&
              !e.nativeEvent.shiftKey &&
              !e.nativeEvent.ctrlKey
            ) {
              handleSubmit();
              e.preventDefault();
              return;
            }
          }
          if (sendQuestionTrigger & SendMessageTriggerType.ON_CTRL_ENTER) {
            if (e.nativeEvent.key === 'Enter' && e.nativeEvent.ctrlKey) {
              handleSubmit();
              e.preventDefault();
              return;
            }
          }
          if (sendQuestionTrigger & SendMessageTriggerType.ON_SHIFT_ENTER) {
            if (e.nativeEvent.key === 'Enter' && e.nativeEvent.shiftKey) {
              handleSubmit();
              e.preventDefault();
              return;
            }
          }
        }}
        border="none"
        bg="preset.editor.bg"
      />
      <Button
        bg="preset.editor.ac"
        onClick={handleSubmit}
        px={2}
        minWidth="50px"
      >
        <FormattedMessage {...messages.putQuestion} />
      </Button>
    </Flex>
  );
};

const AddQuestionInput = ({ puzzleId, userId }: AddQuestionInputProps) => {
  const dispatch = useDispatch();
  const incDialogues = () =>
    dispatch(awardCheckerReducer.actions.dialogues.inc());
  const [addQuestion] = useMutation<
    AddQuestionMutation,
    AddQuestionMutationVariables
  >(ADD_QUESTION_MUTATION, {
    update: (cache, { data }) => {
      if (!data || !data.createDialogue) return;
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
      const { puzzleLogs } = prevDialogueHints;
      const newItem = data.createDialogue;
      if (newItem.id === -1) {
        cache.writeQuery({
          query: DIALOGUE_HINT_QUERY,
          variables: {
            puzzleId,
            userId,
          },
          data: {
            puzzleLogs: [...puzzleLogs, newItem],
          },
        });
      } else {
        incDialogues();
        cache.writeQuery({
          query: DIALOGUE_HINT_QUERY,
          variables: {
            puzzleId,
            userId,
          },
          data: {
            puzzleLogs: upsertItem(puzzleLogs, newItem),
          },
        });
      }
    },
  });
  return (
    <QuestionInputWidget
      onSubmit={(content: string) => {
        if (content.trim() === '')
          return new Promise((_resolve, reject) => {
            reject({ messages: 'Question is empty' });
          });

        return addQuestion({
          variables: {
            question: content,
            puzzleId,
          },
          optimisticResponse: {
            createDialogue: {
              __typename: 'Dialogue',
              id: -1,
              qno: -1,
              good: false,
              true: false,
              question: content,
              questionEditTimes: 0,
              answer: '',
              answerEditTimes: 0,
              created: Date.now(),
              answeredTime: null,
              user: {
                __typename: 'User',
                id: -1,
                icon: null,
                nickname: '...',
                username: '...',
                currentAward: null,
                defaultLicenseId: null,
              },
              modified: Date.now(),
            },
          },
        });
      }}
    />
  );
};

export default AddQuestionInput;
