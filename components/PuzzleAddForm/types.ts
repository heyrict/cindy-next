import {
  AddPuzzleMutationVariables,
  AddPuzzleMutation,
} from 'graphql/Mutations/generated/AddPuzzleMutation';
import { ApolloError } from '@apollo/client';

type PuzzleFormValidationErrorType = Array<React.ReactNode>;

type PuzzleAddFormOnSubmitType = (
  variables: AddPuzzleMutationVariables,
) => Promise<
  | void
  | { error?: ApolloError; data?: AddPuzzleMutation }
  | { validationErrors: PuzzleFormValidationErrorType }
>;

export type PuzzleAddFormInnerProps = {
  onSubmit: PuzzleAddFormOnSubmitType;
  confirmCreatePuzzle: boolean;
};

export type PostPuzzleDetailType = undefined | AddPuzzleMutationVariables;

export type PostPuzzleDetailProps = {
  onSubmit: PuzzleAddFormOnSubmitType;
  getData: () => PostPuzzleDetailType;
  incPuzzles: () => void;
};

export type PreviewPuzzleDetailProps = {
  getData: () => PostPuzzleDetailType;
};
