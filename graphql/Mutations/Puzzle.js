import gql from 'graphql-tag';

import { PuzzleSharedFragment } from '../Fragments/Puzzles';

export const AddPuzzleMutation = gql`
  mutation AddPuzzleMutation(
    $title: String!
    $yami: Int!
    $genre: Int!
    $content: String!
    $solution: String!
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
  ${PuzzleSharedFragment}
`;
