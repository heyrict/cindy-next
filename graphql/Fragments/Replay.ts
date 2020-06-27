import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const REPLAY_SHARED_FRAGMENT = gql`
  fragment ReplayShared on replay {
    id
    title
    user {
      ...UserBrief
    }
    created
  }
  ${USER_BRIEF_FRAGMENT}
`;
