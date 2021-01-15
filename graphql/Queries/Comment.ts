import { gql } from '@apollo/client';

import {
  COMMENT_FRAGMENT,
  COMMENT_DETAIL_FRAGMENT,
} from '../Fragments/Comment';

export const PUZZLE_COMMENT_QUERY = gql`
  query PuzzleCommentQuery($puzzleId: Int!) {
    comments(filter: { puzzleId: { eq: $puzzleId } }, order: { id: DESC }) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PUZZLE_COMMENT_AGGREGATE_QUERY = gql`
  query PuzzleCommentAggregateQuery($puzzleId: Int!) {
    commentCount(filter: { puzzleId: { eq: $puzzleId } })
  }
`;

export const PREVIOUS_COMMENT_VALUE_QUERY = gql`
  query PreviousCommentValueQuery($userId: Int!, $puzzleId: Int!) {
    comments(filter: { puzzleId: { eq: $puzzleId }, userId: { eq: $userId } }) {
      ...Comment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PROFILE_COMMENTS_QUERY = gql`
  query ProfileCommentsQuery($limit: Int, $offset: Int, $userId: Int) {
    comments(
      order: { id: DESC }
      filter: { userId: { eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "comment", filter: ["order", "filter"]) {
      ...CommentDetail
    }
    commentCount(filter: { userId: { eq: $userId } })
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;

export const PROFILE_COMMENTS_RECEIVED_QUERY = gql`
  query ProfileCommentsReceivedQuery(
    $limit: Int!
    $offset: Int!
    $userId: Int!
  ) {
    userReceivedComments(userId: $userId, limit: $limit, offset: $offset)
      @connection(key: "userReceivedComments", filter: ["userId"]) {
      ...CommentDetail
    }
    userReceivedCommentCount(userId: $userId)
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;

export const COMMENTS_QUERY = gql`
  query CommentsQuery($limit: Int!, $offset: Int!) {
    commentsInSolvedPuzzle(limit: $limit, offset: $offset)
      @connection(key: "commentsInSolvedPuzzle") {
      ...CommentDetail
    }
  }
  ${COMMENT_DETAIL_FRAGMENT}
`;
