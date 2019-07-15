import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

export const ADD_PUZZLE_TAG_MUTATION = gql`
  mutation AddPuzzleTagMutation(
    $puzzleId: Int!
    $newTagData: sui_hei_tag_obj_rel_insert_input
  ) {
    insert_sui_hei_puzzle_tag(
      objects: { puzzle_id: $puzzleId, sui_hei_tag: $newTagData }
    ) {
      returning {
        ...PuzzleTag
      }
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const ADD_PUZZLE_TAG_BY_PK_MUTATION = gql`
  mutation AddPuzzleTagByPkMutation($puzzleId: Int!, $tagId: Int) {
    insert_sui_hei_puzzle_tag(
      objects: { puzzle_id: $puzzleId, tag_id: $tagId }
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
