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
