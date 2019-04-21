import gql from 'graphql-tag';

import { ChatmessageFragment, ChatroomFragment } from '../Fragments/Chat';

export const ChatRoomChatmessagesQuery = gql`
  query ChatRoomChatmessages($chatroomId: Int, $limit: Int, $offset: Int) {
    sui_hei_chatmessage(
      where: { chatroom_id: { _eq: $chatroomId } }
      limit: $limit
      offset: $offset
      order_by: [{ id: desc }]
    ) @connection(key: "sui_hei_chatmessage", filter: ["where"]) {
      ...Chatmessage
    }
  }
  ${ChatmessageFragment}
`;

export const ChatRoomPuzzleQuery = gql`
  query ChatRoomPuzzle($puzzleId: Int) {
    sui_hei_puzzle(where: { id: { _eq: $puzzleId } }, limit: 1) {
      id
      anonymous
      sui_hei_user {
        id
      }
    }
  }
`;

export const ChatRoomIdQuery = gql`
  query ChatRoomId($chatroomName: String) {
    sui_hei_chatroom(where: { name: { _eq: $chatroomName } }, limit: 1) {
      id
    }
  }
  ${ChatroomFragment}
`;

export const ChatRoomDescriptionQuery = gql`
  query ChatRoomDescription($chatroomId: Int!) {
    sui_hei_chatroom_by_pk(id: $chatroomId) {
      ...Chatroom
    }
  }
  ${ChatroomFragment}
`;
