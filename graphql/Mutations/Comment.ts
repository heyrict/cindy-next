import gql from 'graphql-tag';

import { COMMENT_FRAGMENT } from '../Fragments/Comment';

export const ADD_COMMENT_MUTATION = gql`
  mutation AddCommentMutation(
    $puzzleId: Int!
    $content: String!
    $spoiler: Boolean!
  ) {
    insert_sui_hei_comment(
      objects: {
        puzzle_id: $puzzleId
        content: $content
        spoiler: $spoiler
      }
      on_conflict: {
        constraint: sui_hei_comment_puzzle_id_user_id_key
        update_columns: [content, spoiler]
      }
    ) {
      returning {
        ...Comment
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
