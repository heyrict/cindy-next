import gql from 'graphql-tag';

import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const USER_DIALOGUE_RANKING_QUERY = gql`
  query UserDialogueRankingQuery(
    $limit: Int!
    $offset: Int!
    $year: Int!
    $month: Int!
  ) {
    userDialogueRanking(
      limit: $limit
      offset: $offset
      year: $year
      month: $month
    ) {
      user {
        ...UserBrief
      }
      valueCount
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const USER_PUZZLE_RANKING_QUERY = gql`
  query UserPuzzleRankingQuery(
    $limit: Int!
    $offset: Int!
    $year: Int!
    $month: Int!
  ) {
    userPuzzleRanking(
      limit: $limit
      offset: $offset
      year: $year
      month: $month
    ) {
      user {
        ...UserBrief
      }
      valueCount
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const PUZZLE_STAR_RANKING_QUERY = gql`
  query PuzzleStarRankingQuery(
    $limit: Int!
    $offset: Int!
    $year: Int!
    $month: Int!
  ) {
    puzzleStarRanking(
      limit: $limit
      offset: $offset
      year: $year
      month: $month
    ) {
      ...PuzzleAggregate
      content
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
