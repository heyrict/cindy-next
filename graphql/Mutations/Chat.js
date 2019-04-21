import gql from 'graphql-tag';

import { ChatmessageFragment } from '../Fragments/Chat';

export const ChatRoomSendMessageMutation = gql`
  mutation ChatRoomSendMessage($content: String, $chatroomId: Int) {
    insert_sui_hei_chatmessage(
      objects: [{ chatroom_id: $chatroomId, content: $content }]
    ) {
      returning {
        ...Chatmessage
      }
    }
  }
  ${ChatmessageFragment}
`;
