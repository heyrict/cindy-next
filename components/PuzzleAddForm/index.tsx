import React from 'react';

import { Mutation } from '@apollo/react-components';
import { ADD_PUZZLE_MUTATION } from 'graphql/Mutations/Puzzle';

import { Box } from 'components/General';

import PuzzleAddFormInner from './PuzzleAddFormInner';

import { FormattedMessage } from 'react-intl';
import addPuzzleMessages from 'messages/pages/add_puzzle';

import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';

const PuzzleAddForm = () => {
  return (
    <Mutation<AddPuzzleMutation, AddPuzzleMutationVariables>
      mutation={ADD_PUZZLE_MUTATION}
    >
      {addPuzzle => (
        <Box px={[2, 3]} py={3}>
          <PuzzleAddFormInner
            onSubmit={(variables: AddPuzzleMutationVariables) => {
              const submitErrors = [] as Array<React.ReactNode>;
              if (variables.title.trim() === '')
                submitErrors.push(
                  <FormattedMessage {...addPuzzleMessages.emptyTitle} />,
                );
              if (variables.content.trim() === '')
                submitErrors.push(
                  <FormattedMessage {...addPuzzleMessages.emptyContent} />,
                );
              if (variables.solution.trim() === '')
                submitErrors.push(
                  <FormattedMessage {...addPuzzleMessages.emptySolution} />,
                );
              if (submitErrors.length > 0) {
                return new Promise(resolve =>
                  resolve({ validationErrors: submitErrors }),
                );
              }

              return addPuzzle({
                variables,
              });
            }}
          />
        </Box>
      )}
    </Mutation>
  );
};

export default PuzzleAddForm;
