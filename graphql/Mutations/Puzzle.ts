import { gql } from '@apollo/client';

import { PUZZLE_SHARED_FRAGMENT } from '../Fragments/Puzzles';
import { LICENSE_BRIEF_FRAGMENT } from 'graphql/Fragments/License';

export const ADD_PUZZLE_MUTATION = gql`
  mutation AddPuzzleMutation(
    $title: String!
    $yami: Yami!
    $genre: Genre!
    $content: String!
    $solution: String!
    $anonymous: Boolean!
    $grotesque: Boolean!
    $licenseId: Int
    $contentImage: [Int!]
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
        licenseId: $licenseId
        contentImage: $contentImage
      }
    ) {
      ...PuzzleShared
      content
      solution
      memo
      license {
        ...LicenseBrief
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
  ${LICENSE_BRIEF_FRAGMENT}
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
