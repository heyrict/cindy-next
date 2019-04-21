import gql from 'graphql-tag';

import { UserBriefFragment } from '../Fragments/User';

export const ChatmessageFragment = gql`
  fragment Chatmessage on sui_hei_chatmessage {
    id
    content
    created
    editTimes
    sui_hei_user {
      ...UserBrief
    }
  }
  ${UserBriefFragment}
`;

export const ChatroomFragment = gql`
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
  ${UserBriefFragment}
`;
