import gql from 'graphql-tag';

import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_BOOKMARK_AGGREGATE_QUERY = gql`
  query PuzzleBookmarkAggregateQuery($puzzleId: Int!) {
    bookmark_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const PREVIOUS_BOOKMARK_VALUE_QUERY = gql`
  query PreviousBookmarkValueQuery($userId: Int!, $puzzleId: Int!) {
    bookmark(
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
    $orderBy: [bookmark_order_by!]
  ) {
    bookmark(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "bookmark", filter: ["order_by", "where"]) {
      id
      value
      puzzle {
        ...PuzzleAggregate
      }
    }
    bookmark_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
