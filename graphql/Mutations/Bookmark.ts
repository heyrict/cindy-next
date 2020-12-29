import gql from 'graphql-tag';

export const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmarkMutation($puzzleId: Int!, $value: smallint!) {
    insert_bookmark(
      objects: { puzzle_id: $puzzleId, value: $value }
      on_conflict: {
        constraint: sui_hei_bookmark_puzzle_id_user_id_key
        update_columns: [value]
      }
    ) {
      returning {
        id
        value
      }
    }
  }
`;
