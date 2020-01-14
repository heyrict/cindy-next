import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_STAR_QUERY = gql`
  query PuzzleStarQuery($puzzleId: Int!, $limit: Int) {
    sui_hei_star(where: { puzzle_id: { _eq: $puzzleId } }, limit: $limit) {
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

export const PREVIOUS_STAR_VALUE_QUERY = gql`
  query PreviousStarValueQuery($userId: Int!, $puzzleId: Int!) {
    sui_hei_star(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
    ) {
      id
      value
    }
  }
`;

export const PROFILE_STARS_QUERY = gql`
  query ProfileStarsQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_star_order_by!]
  ) {
    sui_hei_star(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_star", filter: ["order_by", "where"]) {
      id
      value
      sui_hei_puzzle {
        ...PuzzleAggregate
      }
    }
    sui_hei_star_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
