import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const PUZZLE_STAR_QUERY = gql`
  query PuzzleStarQuery($puzzleId: Int!) {
    sui_hei_star(where: { puzzle_id: { _eq: $puzzleId } }) {
      id
      value
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const PUZZLE_STAR_AGGREGATE_QUERY = gql`
  query PuzzleStarAggregateQuery($puzzleId: Int!) {
    sui_hei_star_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
        sum {
          value
        }
      }
    }
  }
`;
