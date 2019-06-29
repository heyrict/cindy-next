import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';

export type PuzzleFormValidationErrorType = Array<React.ReactNode>;

export type PuzzleAddFormInnerProps = {
  onSubmit: (
    variables: AddPuzzleMutationVariables,
  ) => Promise<
    | void
    | { error?: ApolloError; data?: AddPuzzleMutation }
    | { validationErrors: PuzzleFormValidationErrorType }
  >;
};
