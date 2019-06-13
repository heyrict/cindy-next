import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const PUZZLE_COMMENT_QUERY = gql`
  query PuzzleCommentQuery($puzzleId: Int!) {
    sui_hei_comment(where: { puzzle_id: { _eq: $puzzleId } }) {
      id
      content
      spoiler
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
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
