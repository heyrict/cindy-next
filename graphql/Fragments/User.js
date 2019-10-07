import gql from 'graphql-tag';

import { USERAWARD_FRAGMENT } from './UserAward';

export const USER_BRIEF_FRAGMENT = gql`
  fragment UserBrief on sui_hei_user {
    id
    icon
    nickname
    username
    sui_hei_current_useraward {
      ...UserAward
    }
  }
  ${USERAWARD_FRAGMENT}
`;
