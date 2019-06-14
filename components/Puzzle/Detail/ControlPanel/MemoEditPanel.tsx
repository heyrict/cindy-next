import React, { useState, useRef } from 'react';

import { Mutation } from 'react-apollo';
import { EDIT_MEMO_MUTATION } from 'graphql/Mutations/Puzzle';
import {
  EditMemoMutation,
  EditMemoMutationVariables,
} from 'graphql/Mutations/generated/EditMemoMutation';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import PreviewEditor from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { MemoEditPanelProps } from './types';

const MemoEditPanel = ({ puzzleId, memo }: MemoEditPanelProps) => {
  const [editing, setEditing] = useState(false);
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
      <Mutation<EditMemoMutation, EditMemoMutationVariables>
        mutation={EDIT_MEMO_MUTATION}
      >
        {editMemo =>
          editing ? (
            <React.Fragment>
              <Box width={1}>
                <PreviewEditor ref={editorRef} initialValue={memo} />
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
                  if (!editorRef.current) return;
                  const newMemo = editorRef.current.getText();
                  if (newMemo === memo) {
                    setEditing(false);
                    return;
                  }
                  editMemo({
                    variables: {
                      puzzleId,
                      memo: newMemo,
                    },
                  }).then(result => {
                    if (!result) return;
                    if (result.errors) console.log(result.errors);
                    setEditing(false);
                  });
                }}
              >
                <Img height="xs" src={tickIcon} />
              </ButtonTransparent>
            </React.Fragment>
          ) : (
            <Box p={2}>
              <span dangerouslySetInnerHTML={{ __html: memo }} />
              <ButtonTransparent onClick={() => setEditing(true)}>
                <Img height="xxs" src={pencilIcon} />
              </ButtonTransparent>
            </Box>
          )
        }
      </Mutation>
    </Flex>
  );
};

export default MemoEditPanel;
