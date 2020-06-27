import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const CHATMESSAGE_FRAGMENT = gql`
  fragment Chatmessage on chatmessage {
    id
    content
    created
    editTimes
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const CHATROOM_FRAGMENT = gql`
  fragment Chatroom on chatroom {
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
