import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

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
