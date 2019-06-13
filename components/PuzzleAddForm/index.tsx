import React from 'react';

import { Mutation, MutationFn } from 'react-apollo';
import { ADD_PUZZLE_MUTATION } from 'graphql/Mutations/Puzzle';

import { Box } from 'components/General';

import PuzzleAddFormInner from './PuzzleAddFormInner';

import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';

const PuzzleAddForm = () => {
  return (
    <Mutation mutation={ADD_PUZZLE_MUTATION}>
      {(
        addPuzzle: MutationFn<AddPuzzleMutation, AddPuzzleMutationVariables>,
      ) => (
        <Box px={[2, 3]} py={3}>
          <PuzzleAddFormInner
            onSubmit={(variables: AddPuzzleMutationVariables) =>
              addPuzzle({
                variables,
              })
            }
          />
        </Box>
      )}
    </Mutation>
  );
};

export default PuzzleAddForm;
