import { gql } from '@apollo/client';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_STAR_QUERY = gql`
  query PuzzleStarQuery($puzzleId: Int!, $limit: Int) {
    stars(filter: { puzzleId: { eq: $puzzleId } }, limit: $limit) {
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
    starCount(filter: { puzzleId: { eq: $puzzleId } })
    starSumByPuzzle(puzzleId: $puzzleId)
  }
`;

export const PREVIOUS_STAR_VALUE_QUERY = gql`
  query PreviousStarValueQuery($userId: Int!, $puzzleId: Int!) {
    stars(filter: { puzzleId: { eq: $puzzleId }, userId: { eq: $userId } }) {
      id
      value
    }
  }
`;

export const PROFILE_STARS_QUERY = gql`
  query ProfileStarsQuery($limit: Int, $offset: Int, $userId: Int) {
    stars(
      order: { id: DESC }
      filter: { userId: { eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "stars", filter: ["order", "filter"]) {
      id
      value
      puzzle {
        ...PuzzleAggregate
      }
    }
    starCount(filter: { userId: { eq: $userId } })
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
