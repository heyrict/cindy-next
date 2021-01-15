import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { text2md } from 'common/markdown';

import { useMutation } from '@apollo/client';
import { EDIT_MEMO_MUTATION } from 'graphql/Mutations/Puzzle';
import {
  EditMemoMutation,
  EditMemoMutationVariables,
} from 'graphql/Mutations/generated/EditMemoMutation';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { MemoEditPanelProps } from './types';

const MemoEditPanel = ({ puzzleId, memo }: MemoEditPanelProps) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<LegacyEditor>(null);

  const getMemo = () => (editorRef.current ? editorRef.current.getText() : '');

  const [editMemo] = useMutation<EditMemoMutation, EditMemoMutationVariables>(
    EDIT_MEMO_MUTATION,
    {
      onError: error => {
        toast.error(`${error.name}: ${error.message}`);
        setEditing(true);
        if (editorRef.current) {
          editorRef.current.setText(getMemo());
        }
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
      {editing ? (
        <React.Fragment>
          <Box width={1}>
            <LegacyEditor ref={editorRef} initialValue={memo} />
          </Box>
          <ButtonTransparent
            width={1 / 2}
            onClick={() => {
              setEditing(false);
            }}
          >
            <Img height="xs" src={crossIcon} />
          </ButtonTransparent>
          <ButtonTransparent
            width={1 / 2}
            onClick={() => {
              const newMemo = getMemo();
              if (!editorRef.current) return;
              if (newMemo === memo) {
                setEditing(false);
                return;
              }
              editMemo({
                variables: {
                  puzzleId,
                  memo: newMemo,
                },
                optimisticResponse: {
                  updatePuzzle: {
                    __typename: 'Puzzle',
                    id: puzzleId,
                    memo: newMemo,
                  },
                },
              });
              setEditing(false);
              if (editorRef.current) {
                editorRef.current.setText('');
              }
            }}
          >
            <Img height="xs" src={tickIcon} />
          </ButtonTransparent>
        </React.Fragment>
      ) : (
        <Box p={2}>
          <span dangerouslySetInnerHTML={{ __html: text2md(memo) }} />
          <ButtonTransparent onClick={() => setEditing(true)}>
            <Img height="xxs" src={pencilIcon} />
          </ButtonTransparent>
        </Box>
      )}
    </Flex>
  );
};

export default MemoEditPanel;
