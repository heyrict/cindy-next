import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const DIRECT_MESSAGE_BRIEF = gql`
  fragment DirectMessageBrief on DirectMessage {
    id
    content
    created
    modified
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
