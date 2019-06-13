import gql from 'graphql-tag';

import { CHATMESSAGE_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_CHATMESSAGES_SUBSCRIPTION = gql`
  subscription ChatroomChatmessageSubscription($chatroomId: Int!) {
    chatmessageSub(chatroomId: $chatroomId) {
      eventType
      sui_hei_chatmessage {
        ...Chatmessage
      }
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;
