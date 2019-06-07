import gql from 'graphql-tag';

import { ChatmessageFragment, ChatroomFragment } from '../Fragments/Chat';

export const ChatRoomChatmessagesSubscription = gql`
  subscription ChatRoomChatmessages($chatroomId: Int!) {
    chatmessageSub(chatroomId: $chatroomId) {
      eventType
      sui_hei_chatmessage {
        ...Chatmessage
      }
    }
  }
  ${ChatmessageFragment}
`;
