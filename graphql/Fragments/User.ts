import gql from 'graphql-tag';

import { USER_AWARD_FRAGMENT } from './UserAward';

export const USER_BRIEF_FRAGMENT = gql`
  fragment UserBrief on user {
    id
    icon
    nickname
    username
    current_user_award {
      ...UserAward
    }
  }
  ${USER_AWARD_FRAGMENT}
`;
