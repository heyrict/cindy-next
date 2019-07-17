import gql from 'graphql-tag';

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
