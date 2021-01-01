import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const CHATMESSAGE_FRAGMENT = gql`
  fragment Chatmessage on Chatmessage {
    id
    content
    created
    editTimes
    modified
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const CHATROOM_FRAGMENT = gql`
  fragment Chatroom on Chatroom {
    id
    name
    description
    created
    private
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
