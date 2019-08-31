import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as awardCheckerReducer from 'reducers/awardChecker';
import * as settingReducer from 'reducers/setting';

import { Flex, Textarea, Button } from 'components/General';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { Mutation } from 'react-apollo';
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
import { ApolloError } from 'apollo-client/errors/ApolloError';
import {
  ActionContentType,
  SendMessageTriggerType,
  StateType,
} from 'reducers/types';

const withTrigger = connect((state: StateType) => ({
  sendQuestionTrigger: settingReducer.rootSelector(state).sendQuestionTrigger,
}));

export const QuestionInputWidget = compose(withTrigger)(
  ({ onSubmit, sendQuestionTrigger }: QuestionInputWidgetProps) => {
    const editorRef = useRef<HTMLTextAreaElement>(null!);

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
        borderColor="orange.6"
        borderWidth={2}
        bg="orange.1"
      >
        <Textarea
          ref={editorRef}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (sendQuestionTrigger & SendMessageTriggerType.ON_ENTER) {
              if (
                e.nativeEvent.keyCode === 13 &&
                !e.nativeEvent.shiftKey &&
                !e.nativeEvent.ctrlKey
              ) {
                handleSubmit();
                e.preventDefault();
                return;
              }
            }
            if (sendQuestionTrigger & SendMessageTriggerType.ON_CTRL_ENTER) {
              if (e.nativeEvent.keyCode === 13 && e.nativeEvent.ctrlKey) {
                handleSubmit();
                e.preventDefault();
                return;
              }
            }
            if (sendQuestionTrigger & SendMessageTriggerType.ON_SHIFT_ENTER) {
              if (e.nativeEvent.keyCode === 13 && e.nativeEvent.shiftKey) {
                handleSubmit();
                e.preventDefault();
                return;
              }
            }
          }}
          border="none"
          bg="transparent"
        />
        <Button onClick={handleSubmit} px={2} minWidth="50px">
          <FormattedMessage {...messages.putQuestion} />
        </Button>
      </Flex>
    );
  },
);

const AddQuestionInput = ({
  puzzleId,
  userId,
  incDialogues,
}: AddQuestionInputProps) => {
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
          incDialogues();
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
      {addQuestion => {
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
                  insert_sui_hei_dialogue: {
                    __typename: 'sui_hei_dialogue_mutation_response',
                    returning: [
                      {
                        __typename: 'sui_hei_dialogue',
                        id: -1,
                        qno: -1,
                        good: false,
                        true: false,
                        question: content,
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
              });
            }}
          />
        );
      }}
    </Mutation>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  incDialogues: () => dispatch(awardCheckerReducer.actions.dialogues.inc()),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(AddQuestionInput);
