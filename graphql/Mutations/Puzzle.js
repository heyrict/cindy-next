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
