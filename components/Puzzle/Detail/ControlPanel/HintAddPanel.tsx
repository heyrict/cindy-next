import React, { useRef, useState } from 'react';
import { upsertItem } from 'common/update';

import { Mutation } from 'react-apollo';
import { ADD_HINT_MUTATION } from 'graphql/Mutations/Hint';
import {
  AddHintMutation,
  AddHintMutationVariables,
} from 'graphql/Mutations/generated/AddHintMutation';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';
import ParticipantSelector from './ParticipantSelector';

import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { HintAddPanelProps } from './types';
import { DataProxy } from 'apollo-cache/lib/types';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';

const HintAddPanel = ({ puzzleId, yami }: HintAddPanelProps) => {
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const editorRef = useRef<LegacyEditor>(null);

  return (
    <Flex
      borderColor="orange.8"
      borderWidth={2}
      borderStyle="solid"
      borderRadius={1}
      flexWrap="wrap"
      width={1}
    >
      <Mutation<AddHintMutation, AddHintMutationVariables>
        mutation={ADD_HINT_MUTATION}
        update={(cache: DataProxy, { data }) => {
          if (
            !data ||
            !data.insert_sui_hei_hint ||
            data.insert_sui_hei_hint.returning.length !== 1
          )
            return;

          const prevDialogueHints = cache.readQuery<
            DialogueHintQuery,
            DialogueHintQueryVariables
          >({
            query: DIALOGUE_HINT_QUERY,
            variables: {
              puzzleId,
            },
          });
          if (!prevDialogueHints) return;
          const { sui_hei_hint, sui_hei_dialogue } = prevDialogueHints;

          const newItem = data.insert_sui_hei_hint.returning[0];
          if (newItem.id === -1) {
            // Optimistic response
            cache.writeQuery({
              query: DIALOGUE_HINT_QUERY,
              variables: {
                puzzleId,
              },
              data: {
                sui_hei_hint: [...sui_hei_hint, newItem],
                sui_hei_dialogue,
              },
            });
          } else {
            cache.writeQuery({
              query: DIALOGUE_HINT_QUERY,
              variables: {
                puzzleId,
              },
              data: {
                sui_hei_hint: upsertItem(sui_hei_hint, newItem),
                sui_hei_dialogue,
              },
            });
          }
        }}
      >
        {addHint => (
          <React.Fragment>
            {yami !== 0 && (
              <Box width={1}>
                <ParticipantSelector
                  value={receiverId}
                  setValue={value => setReceiverId(value)}
                />
              </Box>
            )}
            <Box width={1}>
              <LegacyEditor ref={editorRef} />
            </Box>
            <ButtonTransparent
              width={1 / 2}
              onClick={() => {
                if (editorRef.current) editorRef.current.setText('');
                setReceiverId(null);
              }}
            >
              <Img height="xs" src={crossIcon} />
            </ButtonTransparent>
            <ButtonTransparent
              width={1 / 2}
              onClick={() => {
                if (!editorRef.current) return;
                const hint = editorRef.current.getText();
                if (hint.trim() === '') return;

                addHint({
                  variables: {
                    puzzleId,
                    receiverId,
                    content: hint,
                  },
                  optimisticResponse: {
                    insert_sui_hei_hint: {
                      __typename: 'sui_hei_hint_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_hint',
                          id: -1,
                          content: hint,
                          created: Date.now(),
                          edittimes: 0,
                          receiver:
                            receiverId === null
                              ? null
                              : {
                                  __typename: 'sui_hei_user',
                                  id: receiverId,
                                  nickname: '...',
                                  username: '...',
                                  sui_hei_current_useraward: null,
                                },
                        },
                      ],
                    },
                  },
                })
                  .then(result => {
                    if (!result) return;
                    if (result.errors) {
                      if (editorRef.current) editorRef.current.setText(hint);
                      setReceiverId(receiverId);
                      console.log(result.errors);
                    }
                  })
                  .catch(e => {
                    console.log(e);
                    if (editorRef.current) editorRef.current.setText(hint);
                    setReceiverId(receiverId);
                  });
                if (editorRef.current) editorRef.current.setText('');
                setReceiverId(null);
              }}
            >
              <Img height="xs" src={tickIcon} />
            </ButtonTransparent>
          </React.Fragment>
        )}
      </Mutation>
    </Flex>
  );
};

export default HintAddPanel;
