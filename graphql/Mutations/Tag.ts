import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

export const ADD_PUZZLE_TAG_MUTATION = gql`
  mutation AddPuzzleTagMutation($puzzleId: Int!, $tagName: String!) {
    insert_sui_hei_puzzle_tag(
      objects: {
        puzzle_id: $puzzleId
        sui_hei_tag: {
          data: { name: $tagName }
          on_conflict: {
            update_columns: [name]
            constraint: sui_hei_tag_name_key
          }
        }
      }
    ) {
      returning {
        ...PuzzleTag
      }
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const DELETE_PUZZLE_TAG_MUTATION = gql`
  mutation DeletePuzzleTagMutation($puzzleTagId: Int!) {
    delete_sui_hei_puzzle_tag(where: { id: { _eq: $puzzleTagId } }) {
      affected_rows
    }
  }
`;
