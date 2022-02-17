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
  | { error?: ApolloError; data?: AddPuzzleMutation | null }
  | { validationErrors: PuzzleFormValidationErrorType }
>;

export type PuzzleAddFormInnerProps = {
  onSubmit: PuzzleAddFormOnSubmitType;
  confirmCreatePuzzle: boolean;
  userId: number | null;
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

export type LicenseButtonsProps = {
  userId?: number;
  selected: null | number;
  onChange: (select: number | null) => any;
};
