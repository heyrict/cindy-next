import React, { useState, useRef } from 'react';
import { text2md } from 'common/markdown';

import { Mutation } from 'react-apollo';
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
                    optimisticResponse: {
                      update_sui_hei_puzzle: {
                        __typename: 'sui_hei_puzzle_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_puzzle',
                            id: puzzleId,
                            memo: newMemo,
                          },
                        ],
                      },
                    },
                  })
                    .then(result => {
                      if (!result) return;
                      if (result.errors) {
                        console.log(result.errors);
                        setEditing(true);
                        if (editorRef.current) {
                          editorRef.current.setText(newMemo);
                        }
                      }
                    })
                    .catch(e => {
                      console.log(e);
                      setEditing(true);
                      if (editorRef.current) {
                        editorRef.current.setText(newMemo);
                      }
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
          )
        }
      </Mutation>
    </Flex>
  );
};

export default MemoEditPanel;
