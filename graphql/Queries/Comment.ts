import gql from 'graphql-tag';

import {
  COMMENT_FRAGMENT,
  COMMENT_DETAIL_FRAGMENT,
} from '../Fragments/Comment';

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

export const PROFILE_COMMENTS_QUERY = gql`
  query ProfileCommentsQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_comment_order_by!]
  ) {
    sui_hei_comment(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
    sui_hei_comment_aggregate(where: { user_id: { _eq: $userId } }) {
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
    $orderBy: [sui_hei_comment_order_by!]
  ) {
    sui_hei_comment(
      order_by: $orderBy
      where: { sui_hei_puzzle: { user_id: { _eq: $userId } } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
    sui_hei_comment_aggregate(
      where: { sui_hei_puzzle: { user_id: { _eq: $userId } } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;

export const COMMENTS_QUERY = gql`
  query CommentsQuery($limit: Int, $offset: Int) {
    sui_hei_comment(
      where: { sui_hei_puzzle: { status: { _eq: 1 } } }
      order_by: { id: desc }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_comment", filter: ["order_by", "where"]) {
      ...CommentDetail
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;
