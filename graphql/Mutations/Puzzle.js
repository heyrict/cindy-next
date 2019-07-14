import gql from 'graphql-tag';

import { PUZZLE_SHARED_FRAGMENT } from '../Fragments/Puzzles';

export const ADD_PUZZLE_MUTATION = gql`
  mutation AddPuzzleMutation(
    $title: String!
    $yami: Int!
    $genre: Int!
    $content: String!
    $solution: String!
    $anonymous: Boolean!
    $grotesque: Boolean!
    $dazedOn: date!
  ) {
    insert_sui_hei_puzzle(
      objects: [
        {
          title: $title
          yami: $yami
          genre: $genre
          content: $content
          solution: $solution
          anonymous: $anonymous
          grotesque: $grotesque
          dazed_on: $dazedOn
        }
      ]
    ) {
      returning {
        ...PuzzleShared
        content
        solution
        memo
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const EDIT_SOLUTION_MUTATION = gql`
  mutation EditSolutionMutation($puzzleId: Int!, $solution: String!) {
    update_sui_hei_puzzle(
      _set: { solution: $solution }
      where: { id: { _eq: $puzzleId } }
    ) {
      returning {
        id
        solution
      }
    }
  }
`;

export const EDIT_MEMO_MUTATION = gql`
  mutation EditMemoMutation($puzzleId: Int!, $memo: String!) {
    update_sui_hei_puzzle(
      _set: { memo: $memo }
      where: { id: { _eq: $puzzleId } }
    ) {
      returning {
        id
        memo
      }
    }
  }
`;

export const UPDATE_PUZZLE_MUTATION = gql`
  mutation UpdatePuzzleMutation(
    $puzzleId: Int!
    $grotesque: Boolean
    $dazedOn: date
    $status: Int
    $yami: Int
  ) {
    update_sui_hei_puzzle(
      _set: {
        grotesque: $grotesque
        dazed_on: $dazedOn
        status: $status
        yami: $yami
      }
      where: { id: { _eq: $puzzleId } }
    ) {
      returning {
        id
        yami
        grotesque
        dazed_on
        status
      }
    }
  }
`;
