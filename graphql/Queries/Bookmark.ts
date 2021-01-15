import { gql } from '@apollo/client';

import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLE_BOOKMARK_AGGREGATE_QUERY = gql`
  query PuzzleBookmarkAggregateQuery($puzzleId: Int!) {
    bookmarkCount(filter: { puzzleId: { eq: $puzzleId } })
  }
`;

export const PREVIOUS_BOOKMARK_VALUE_QUERY = gql`
  query PreviousBookmarkValueQuery($userId: Int!, $puzzleId: Int!) {
    bookmarks(
      filter: { puzzleId: { eq: $puzzleId }, userId: { eq: $userId } }
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
    $orderBy: [BookmarkOrder!]
  ) {
    bookmarks(
      order: $orderBy
      filter: { userId: { eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "bookmark", filter: ["order", "filter"]) {
      id
      value
      puzzle {
        ...PuzzleAggregate
      }
    }
    bookmarkCount(filter: { userId: { eq: $userId } })
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
