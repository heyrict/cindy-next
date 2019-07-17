import gql from 'graphql-tag';

export const ADD_STAR_MUTATION = gql`
  mutation AddStarMutation($puzzleId: Int!, $value: smallint!) {
    insert_sui_hei_star(
      objects: { puzzle_id: $puzzleId, value: $value }
      on_conflict: {
        constraint: sui_hei_star_puzzle_id_user_id_key
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
