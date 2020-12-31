import gql from 'graphql-tag';

export const CHATROOM_CHATMESSAGES_SUB = gql`
  subscription ChatroomChatmessageSub($chatroomId: Int!, $limit: Int!) {
    chatmessageSub(filter: { chatroomId: { eq: $chatroomId } }) {
      id
      modified
    }
  }
`;
