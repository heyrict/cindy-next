import gql from 'graphql-tag';

export const USERAWARD_FRAGMENT = gql`
  fragment UserAward on sui_hei_useraward {
    id
    created
    sui_hei_award {
      id
      name
      description
    }
  }
`;
