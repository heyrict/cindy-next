import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { text2md } from 'common/markdown';

import { useMutation } from '@apollo/client';
import { EDIT_SOLUTION_MUTATION } from 'graphql/Mutations/Puzzle';
import {
  EditSolutionMutation,
  EditSolutionMutationVariables,
} from 'graphql/Mutations/generated/EditSolutionMutation';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { ButtonTransparent, Flex, Box, Img } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { StateType } from 'reducers/types';
import { SolutionEditPanelProps } from './types';
import { Status, Yami } from 'generated/globalTypes';

const SolutionEditPanel = ({
  puzzleId,
  solution,
  status,
  yami,
  userId,
}: SolutionEditPanelProps) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<LegacyEditor>(null);

  const newSolution = editorRef.current ? editorRef.current.getText() : '';

  const [editSolution] = useMutation<
    EditSolutionMutation,
    EditSolutionMutationVariables
  >(EDIT_SOLUTION_MUTATION, {
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      setEditing(true);
      if (editorRef.current) {
        editorRef.current.setText(newSolution);
      }
    },
  });

  const canEdit = status === Status.UNDERGOING && yami !== Yami.LONGTERM;

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
            <LegacyEditor
              showImages
              userId={userId}
              puzzleId={null}
              ref={editorRef}
              initialValue={solution}
            />
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
                  updatePuzzle: {
                    __typename: 'Puzzle',
                    id: puzzleId,
                    solution: newSolution,
                  },
                },
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
      )}
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(SolutionEditPanel);
