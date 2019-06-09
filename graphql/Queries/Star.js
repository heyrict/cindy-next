import gql from 'graphql-tag';

import { UserBriefFragment } from '../Fragments/User';

export const PuzzleStarQuery = gql`
  query PuzzleStarQuery($puzzleId: Int!) {
    sui_hei_star(where: { puzzle_id: { _eq: $puzzleId } }) {
      id
      value
      sui_hei_user {
        ...UserBriefFragment
      }
    }
  }
  ${UserBriefFragment}
`;

export const PuzzleStarAggregateQuery = gql`
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
