import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_STAR_QUERY = gql`
  query PuzzleStarQuery($puzzleId: Int!, $limit: Int) {
    star(where: { puzzle_id: { _eq: $puzzleId } }, limit: $limit) {
      id
      value
      user {
        ...UserBrief
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const PUZZLE_STAR_AGGREGATE_QUERY = gql`
  query PuzzleStarAggregateQuery($puzzleId: Int!) {
    star_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
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
    star(where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }) {
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
    $orderBy: [star_order_by!]
  ) {
    star(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "star", filter: ["order_by", "where"]) {
      id
      value
      puzzle {
        ...PuzzleAggregate
      }
    }
    star_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
