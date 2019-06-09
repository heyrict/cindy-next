import gql from 'graphql-tag';

import { UserBriefFragment } from '../Fragments/User';

export const PuzzleCommentQuery = gql`
  query PuzzleCommentQuery($puzzleId: Int!) {
    sui_hei_comment(where: { puzzle_id: { _eq: $puzzleId } }) {
      id
      content
      spoiler
      sui_hei_user {
        ...UserBriefFragment
      }
    }
  }
  ${UserBriefFragment}
`;

export const PuzzleCommentAggregateQuery = gql`
  query PuzzleCommentAggregateQuery($puzzleId: Int!) {
    sui_hei_comment_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
      }
    }
  }
`;
