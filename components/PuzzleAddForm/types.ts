import { AddPuzzleMutationVariables } from 'graphql/Mutations/generated/AddPuzzleMutation';

export type PuzzleAddFormInnerProps = {
  onSubmit: (variables: AddPuzzleMutationVariables) => Promise<any>;
};
