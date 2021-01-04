import { gql } from '@apollo/client';

import { COMMENT_FRAGMENT } from '../Fragments/Comment';

export const ADD_COMMENT_MUTATION = gql`
  mutation AddCommentMutation(
    $puzzleId: Int!
    $content: String!
    $spoiler: Boolean!
  ) {
    createComment(
      data: { puzzleId: $puzzleId, content: $content, spoiler: $spoiler }
    ) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateCommentMutation(
    $id: Int!
    $content: String!
    $spoiler: Boolean!
  ) {
    updateComment(id: $id, set: { content: $content, spoiler: $spoiler }) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;
