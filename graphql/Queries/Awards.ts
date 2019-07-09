import gql from 'graphql-tag';

export const ALL_AWARDS_QUERY = gql`
  query AllAwardsQuery {
    sui_hei_award {
      id
      name
      description
    }
  }
`;
