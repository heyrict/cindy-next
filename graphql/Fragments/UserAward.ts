import gql from 'graphql-tag';

export const USER_AWARD_FRAGMENT = gql`
  fragment UserAward on user_award {
    id
    created
    award {
      id
      name
      description
    }
  }
`;
