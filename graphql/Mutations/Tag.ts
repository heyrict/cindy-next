import { gql } from '@apollo/client';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

export const ADD_PUZZLE_TAG_MUTATION = gql`
  mutation AddPuzzleTagMutation($puzzleId: Int!, $tagId: Int!) {
    createPuzzleTag(data: { puzzleId: $puzzleId, tagId: $tagId }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const ADD_PUZZLE_TAG_WITH_TAG_MUTATION = gql`
  mutation AddPuzzleTagWithTagMutation($puzzleId: Int!, $tag: CreateTagInput!) {
    createPuzzleTagWithTag(data: { puzzleId: $puzzleId, tag: $tag }) {
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
