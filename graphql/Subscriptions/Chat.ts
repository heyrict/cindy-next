import { gql } from '@apollo/client';

export const CHATROOM_CHATMESSAGES_SUB = gql`
  subscription ChatroomChatmessageSub($chatroomId: Int!) {
    chatmessageSub(filter: { chatroomId: { eq: $chatroomId } }) {
      data {
        id
        modified
      }
    }
  }
`;
