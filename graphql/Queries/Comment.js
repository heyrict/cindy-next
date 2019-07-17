import gql from 'graphql-tag';

import { COMMENT_FRAGMENT } from '../Fragments/Comment';

export const PUZZLE_COMMENT_QUERY = gql`
  query PuzzleCommentQuery($puzzleId: Int!) {
    sui_hei_comment(
      where: { puzzle_id: { _eq: $puzzleId } }
      order_by: { id: desc }
    ) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PUZZLE_COMMENT_AGGREGATE_QUERY = gql`
  query PuzzleCommentAggregateQuery($puzzleId: Int!) {
    sui_hei_comment_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const PREVIOUS_COMMENT_VALUE_QUERY = gql`
  query PreviousCommentValueQuery($userId: Int!, $puzzleId: Int!) {
    sui_hei_comment(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
    ) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;
