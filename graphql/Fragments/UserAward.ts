import { gql } from '@apollo/client';

export const USER_AWARD_FRAGMENT = gql`
  fragment UserAward on UserAward {
    id
    created
    award {
      id
      name
      description
    }
  }
`;
