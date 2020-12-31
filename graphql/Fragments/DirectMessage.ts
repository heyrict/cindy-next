import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const DIRECT_MESSAGE_FRAGMENT = gql`
  fragment DirectMessage on DirectMessage {
    id
    content
    created
    sender {
      ...UserBrief
    }
    receiver {
      ...UserBrief
    }
    editTimes
  }
  ${USER_BRIEF_FRAGMENT}
`;
