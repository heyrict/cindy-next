import gql from 'graphql-tag';

import {
  COMMENT_FRAGMENT,
  COMMENT_DETAIL_FRAGMENT,
} from '../Fragments/Comment';

export const PUZZLE_COMMENT_QUERY = gql`
  query PuzzleCommentQuery($puzzleId: Int!) {
    comment(where: { puzzle_id: { _eq: $puzzleId } }, order_by: { id: desc }) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PUZZLE_COMMENT_AGGREGATE_QUERY = gql`
  query PuzzleCommentAggregateQuery($puzzleId: Int!) {
    comment_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const PREVIOUS_COMMENT_VALUE_QUERY = gql`
  query PreviousCommentValueQuery($userId: Int!, $puzzleId: Int!) {
    comment(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
    ) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PROFILE_COMMENTS_QUERY = gql`
  query ProfileCommentsQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [comment_order_by!]
  ) {
    comment(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
    comment_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;

export const PROFILE_COMMENTS_RECEIVED_QUERY = gql`
  query ProfileCommentsReceivedQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [comment_order_by!]
  ) {
    comment(
      order_by: $orderBy
      where: { puzzle: { user_id: { _eq: $userId } } }
      limit: $limit
      offset: $offset
    ) @connection(key: "comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
    comment_aggregate(where: { puzzle: { user_id: { _eq: $userId } } }) {
      aggregate {
        count
      }
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;

export const COMMENTS_QUERY = gql`
  query CommentsQuery($limit: Int, $offset: Int) {
    comment(
      where: { puzzle: { status: { _eq: 1 } } }
      order_by: { id: desc }
      limit: $limit
      offset: $offset
    ) @connection(key: "comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;
