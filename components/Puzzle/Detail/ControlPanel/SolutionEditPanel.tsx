import React, { useState, useRef } from 'react';
import { text2md } from 'common/markdown';

import { Mutation } from 'react-apollo';
import { EDIT_SOLUTION_MUTATION } from 'graphql/Mutations/Puzzle';
import {
  EditSolutionMutation,
  EditSolutionMutationVariables,
} from 'graphql/Mutations/generated/EditSolutionMutation';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { SolutionEditPanelProps } from './types';

const SolutionEditPanel = ({
  puzzleId,
  solution,
  status,
  yami,
}: SolutionEditPanelProps) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<LegacyEditor>(null);

  const canEdit = status === 0 && yami !== 2;

  return (
    <Flex
      borderColor="orange.8"
      borderWidth={2}
      borderStyle="solid"
      borderRadius={1}
      flexWrap="wrap"
      width={1}
    >
      <Mutation<EditSolutionMutation, EditSolutionMutationVariables>
        mutation={EDIT_SOLUTION_MUTATION}
      >
        {editSolution =>
          editing ? (
            <React.Fragment>
              <Box width={1}>
                <LegacyEditor ref={editorRef} initialValue={solution} />
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
                  if (!canEdit) return;
                  if (!editorRef.current) return;
                  const newSolution = editorRef.current.getText();
                  if (newSolution === solution || newSolution.trim() === '') {
                    setEditing(false);
                    return;
                  }
                  editSolution({
                    variables: {
                      puzzleId,
                      solution: newSolution,
                    },
                    optimisticResponse: {
                      update_sui_hei_puzzle: {
                        __typename: 'sui_hei_puzzle_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_puzzle',
                            id: puzzleId,
                            solution: newSolution,
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
                          editorRef.current.setText(newSolution);
                        }
                      }
                    })
                    .catch(e => {
                      console.log(e);
                      setEditing(true);
                      if (editorRef.current) {
                        editorRef.current.setText(newSolution);
                      }
                    });
                  setEditing(false);
                }}
              >
                <Img height="xs" src={tickIcon} />
              </ButtonTransparent>
            </React.Fragment>
          ) : (
            <Box p={2}>
              <span dangerouslySetInnerHTML={{ __html: text2md(solution) }} />
              {canEdit && (
                <ButtonTransparent onClick={() => setEditing(true)}>
                  <Img height="xxs" src={pencilIcon} />
                </ButtonTransparent>
              )}
            </Box>
          )
        }
      </Mutation>
    </Flex>
  );
};

export default SolutionEditPanel;
