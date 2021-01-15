import React from 'react';
import { upsertItem } from 'common/update';

import { useMutation } from '@apollo/client';
import { ADD_PUZZLE_MUTATION } from 'graphql/Mutations/Puzzle';
import { PUZZLES_UNSOLVED_QUERY } from 'graphql/Queries/Puzzles';

import { Box } from 'components/General';

import PuzzleAddFormInner from './PuzzleAddFormInner';

import { FormattedMessage } from 'react-intl';
import addPuzzleMessages from 'messages/pages/add_puzzle';

import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';
import {
  PuzzlesUnsolvedQuery,
  PuzzlesUnsolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesUnsolvedQuery';

const PuzzleAddForm = () => {
  const [addPuzzle] = useMutation<
    AddPuzzleMutation,
    AddPuzzleMutationVariables
  >(ADD_PUZZLE_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createPuzzle) return;

      let prevQuery = proxy.readQuery<
        PuzzlesUnsolvedQuery,
        PuzzlesUnsolvedQueryVariables
      >({
        query: PUZZLES_UNSOLVED_QUERY,
      });

      if (prevQuery) {
        proxy.writeQuery<PuzzlesUnsolvedQuery, PuzzlesUnsolvedQueryVariables>({
          query: PUZZLES_UNSOLVED_QUERY,
          data: {
            puzzles: upsertItem(
              prevQuery.puzzles,
              {
                ...data.createPuzzle,
                dialogueCount: 0,
                dialogueNewCount: 0,
                dialogueMaxAnsweredTime: new Date().toISOString(),
              },
              'id',
              'desc',
            ),
          },
        });
      }
    },
  });

  return (
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
  );
};

export default PuzzleAddForm;
