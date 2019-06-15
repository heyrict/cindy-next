import React, { useRef, useState } from 'react';
import { upsertItem } from 'common/update';

import { Mutation } from 'react-apollo';
import { ADD_HINT_MUTATION } from 'graphql/Mutations/Hint';
import {
  AddHintMutation,
  AddHintMutationVariables,
} from 'graphql/Mutations/generated/AddHintMutation';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import PreviewEditor from 'components/PreviewEditor';
import ParticipantSelector from './ParticipantSelector';

import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { HintAddPanelProps } from './types';
import { DataProxy } from 'apollo-cache/lib/types';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';

const HintAddPanel = ({ puzzleId, yami }: HintAddPanelProps) => {
  const [receiverId, setReceiverId] = useState(null);
  const editorRef = useRef<PreviewEditor>(null);

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
          const { sui_hei_dialogue = undefined, sui_hei_hint = undefined } =
            cache.readQuery({
              query: DIALOGUE_HINT_QUERY,
              variables: {
                puzzleId,
              },
            }) || {};
          const newItem = data.insert_sui_hei_hint.returning[0];
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
              <PreviewEditor ref={editorRef} />
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
                }).then(result => {
                  if (!result) return;
                  if (result.errors) console.log(result.errors);
                  if (editorRef.current) editorRef.current.setText('');
                  setReceiverId(null);
                });
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
