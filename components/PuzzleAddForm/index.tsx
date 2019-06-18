import React, { useState } from 'react';

import { Mutation, MutationFn } from 'react-apollo';
import { ADD_PUZZLE_MUTATION } from 'graphql/Mutations/Puzzle';

import { Box } from 'components/General';

import PuzzleAddFormInner from './PuzzleAddFormInner';

import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';

const PuzzleAddForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <Mutation mutation={ADD_PUZZLE_MUTATION}>
      {(
        addPuzzle: MutationFn<AddPuzzleMutation, AddPuzzleMutationVariables>,
      ) => (
        <Box px={[2, 3]} py={3}>
          <PuzzleAddFormInner
            onSubmit={(variables: AddPuzzleMutationVariables) => {
              const submitErrors = [] as Array<string>;
              if (variables.title.trim() === '')
                submitErrors.push('Title is empty!');
              if (variables.content.trim() === '')
                submitErrors.push('Content is empty!');
              if (variables.solution.trim() === '')
                submitErrors.push('Solution is empty!');
              if (submitErrors.length > 0) {
                setErrors(submitErrors);
                return new Promise(resolve =>
                  resolve({ errors: submitErrors }),
                );
              }

              return addPuzzle({
                variables,
              });
            }}
          />
          {errors.map(error => (
            <div key={error} style={{ color: 'red' }}>
              {error}
            </div>
          ))}
        </Box>
      )}
    </Mutation>
  );
};

export default PuzzleAddForm;
