import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const CHATMESSAGE_FRAGMENT = gql`
  fragment Chatmessage on sui_hei_chatmessage {
    id
    content
    created
    editTimes
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const CHATROOM_FRAGMENT = gql`
  fragment Chatroom on sui_hei_chatroom {
    id
    name
    description
    created
    private
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
