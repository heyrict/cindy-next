import gql from 'graphql-tag';

import { ChatmessageFragment, ChatroomFragment } from '../Fragments/Chat';

export const ChatRoomChatmessagesSubscription = gql`
  subscription ChatRoomChatmessages($chatroomId: Int) {
    sui_hei_chatmessage(
      where: { chatroom_id: { _eq: $chatroomId } }
      limit: 2
      order_by: [{ id: desc }]
    ) {
      ...Chatmessage
    }
  }
  ${ChatmessageFragment}
`;
