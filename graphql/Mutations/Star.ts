import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const ADD_STAR_MUTATION = gql`
  mutation AddStarMutation($puzzleId: Int!, $value: smallint!) {
    insert_sui_hei_star(
      objects: { puzzle_id: $puzzleId, value: $value }
      on_conflict: { constraint: sui_hei_star_pkey, update_columns: [value] }
    ) {
      returning {
        id
        value
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
