import gql from 'graphql-tag';

import { PUZZLE_SHARED_FRAGMENT } from '../Fragments/Puzzles';

export const ADD_PUZZLE_MUTATION = gql`
  mutation AddPuzzleMutation(
    $title: String!
    $yami: Yami!
    $genre: Genre!
    $content: String!
    $solution: String!
    $anonymous: Boolean!
    $grotesque: Boolean!
    $dazedOn: NaiveDate
  ) {
    createPuzzle(
      data: {
        title: $title
        yami: $yami
        genre: $genre
        content: $content
        solution: $solution
        anonymous: $anonymous
        grotesque: $grotesque
        dazedOn: $dazedOn
      }
    ) {
      ...PuzzleShared
      content
      solution
      memo
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const EDIT_SOLUTION_MUTATION = gql`
  mutation EditSolutionMutation($puzzleId: Int!, $solution: String!) {
    updatePuzzle(id: $puzzleId, set: { solution: $solution }) {
      id
      solution
    }
  }
`;

export const EDIT_MEMO_MUTATION = gql`
  mutation EditMemoMutation($puzzleId: Int!, $memo: String!) {
    updatePuzzle(id: $puzzleId, set: { memo: $memo }) {
      id
      memo
    }
  }
`;

export const UPDATE_PUZZLE_DAZED_ON_MUTATION = gql`
  mutation UpdatePuzzleDazedOnMutation($dazedOn: NaiveDate, $puzzleId: Int!) {
    updatePuzzle(id: $puzzleId, set: { dazedOn: $dazedOn }) {
      id
      dazedOn
    }
  }
`;

export const UPDATE_PUZZLE_MUTATION = gql`
  mutation UpdatePuzzleMutation(
    $puzzleId: Int!
    $grotesque: Boolean
    $status: Status
    $yami: Yami
  ) {
    updatePuzzle(
      id: $puzzleId
      set: { grotesque: $grotesque, status: $status, yami: $yami }
    ) {
      id
      yami
      grotesque
      status
    }
  }
`;
