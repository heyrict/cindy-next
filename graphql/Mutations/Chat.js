import gql from 'graphql-tag';

import { CHATMESSAGE_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_SEND_MESSAGE_MUTATION = gql`
  mutation ChatroomSendMessage($content: String, $chatroomId: Int) {
    insert_sui_hei_chatmessage(
      objects: [{ chatroom_id: $chatroomId, content: $content }]
    ) {
      returning {
        ...Chatmessage
      }
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;
