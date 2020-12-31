import gql from 'graphql-tag';

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

// TODO this mutations is created upon splitting the upsert mutation above
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
