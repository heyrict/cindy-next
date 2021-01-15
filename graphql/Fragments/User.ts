import { gql } from '@apollo/client';

import { USER_AWARD_FRAGMENT } from './UserAward';

export const USER_BRIEF_FRAGMENT = gql`
  fragment UserBrief on User {
    id
    icon
    nickname
    username
    currentAward {
      ...UserAward
    }
  }
  ${USER_AWARD_FRAGMENT}
`;
