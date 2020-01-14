import gql from 'graphql-tag';

import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_BOOKMARK_AGGREGATE_QUERY = gql`
  query PuzzleBookmarkAggregateQuery($puzzleId: Int!) {
    sui_hei_bookmark_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const PREVIOUS_BOOKMARK_VALUE_QUERY = gql`
  query PreviousBookmarkValueQuery($userId: Int!, $puzzleId: Int!) {
    sui_hei_bookmark(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
    ) {
      id
      value
    }
  }
`;

export const PROFILE_BOOKMARKS_QUERY = gql`
  query ProfileBookmarksQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_bookmark_order_by!]
  ) {
    sui_hei_bookmark(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_bookmark", filter: ["order_by", "where"]) {
      id
      value
      sui_hei_puzzle {
        ...PuzzleAggregate
      }
    }
    sui_hei_bookmark_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
