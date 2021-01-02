import React, { useRef, useState } from 'react';
import { upsertItem } from 'common/update';

import { useMutation } from '@apollo/client';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';
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
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';
import {Yami} from 'generated/globalTypes';

const HintAddPanel = ({ puzzleId, yami }: HintAddPanelProps) => {
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const editorRef = useRef<LegacyEditor>(null);

  const [addHint] = useMutation<AddHintMutation, AddHintMutationVariables>(
    ADD_HINT_MUTATION,
    {
      update: (cache, { data }) => {
        if (!data || !data.createHint) return;

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
        const { puzzleLogs } = prevDialogueHints;

        const newItem = data.createHint;
        cache.writeQuery({
          query: DIALOGUE_HINT_QUERY,
          variables: {
            puzzleId,
          },
          data: {
            puzzleLogs:
              newItem.id === -1
                ? [...puzzleLogs, newItem]
                : upsertItem(puzzleLogs, newItem),
          },
        });
      },
    },
  );

  return (
    <Flex
      borderColor="orange.8"
      borderWidth={2}
      borderStyle="solid"
      borderRadius={1}
      flexWrap="wrap"
      width={1}
    >
      {yami !== Yami.NONE && (
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
              createHint: {
                __typename: 'Hint',
                id: -1,
                content: hint,
                created: Date.now(),
                editTimes: 0,
                receiver:
                  receiverId === null
                    ? null
                    : {
                        __typename: 'User',
                        id: receiverId,
                        icon: null,
                        nickname: '...',
                        username: '...',
                        currentAward: null,
                      },
                modified: Date.now(),
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
    </Flex>
  );
};

export default HintAddPanel;
