import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

// TODO Add new endpoint for this mutation
export const ADD_PUZZLE_TAG_MUTATION = gql`
  mutation AddPuzzleTagMutation(
    $puzzleId: Int!
    $newTagData: tag_obj_rel_insert_input
  ) {
    insert_puzzle_tag(data: { puzzleId: $puzzleId, tag: $newTagData }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const ADD_PUZZLE_TAG_BY_PK_MUTATION = gql`
  mutation AddPuzzleTagByPkMutation($puzzleId: Int!, $tagId: Int!) {
    createPuzzleTag(data: { puzzleId: $puzzleId, tagId: $tagId }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const DELETE_PUZZLE_TAG_MUTATION = gql`
  mutation DeletePuzzleTagMutation($puzzleTagId: Int!) {
    deletePuzzleTag(id: $puzzleTagId) {
      id
    }
  }
`;
