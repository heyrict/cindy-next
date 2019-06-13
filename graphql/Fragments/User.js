import gql from 'graphql-tag';

export const USER_BRIEF_FRAGMENT = gql`
  fragment UserBrief on sui_hei_user {
    id
    nickname
    username
    sui_hei_current_useraward {
      id
      created
      sui_hei_award {
        id
        name
        description
      }
    }
  }
`;
