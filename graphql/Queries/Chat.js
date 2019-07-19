import gql from 'graphql-tag';

import { CHATMESSAGE_FRAGMENT, CHATROOM_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_CHATMESSAGES_QUERY = gql`
  query ChatroomChatmessages($chatroomId: Int, $limit: Int, $offset: Int) {
    sui_hei_chatmessage(
      where: { chatroom_id: { _eq: $chatroomId } }
      limit: $limit
      offset: $offset
      order_by: [{ id: desc }]
    ) @connection(key: "sui_hei_chatmessage", filter: ["where"]) {
      ...Chatmessage
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_LOGS_QUERY = gql`
  query ChatroomLogsQuery($chatroomId: Int, $limit: Int, $offset: Int) {
    sui_hei_chatmessage(
      where: { chatroom_id: { _eq: $chatroomId } }
      limit: $limit
      offset: $offset
      order_by: [{ id: asc }]
    ) {
      ...Chatmessage
    }
    sui_hei_chatmessage_aggregate(
      where: { chatroom_id: { _eq: $chatroomId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_PUZZLE_QUERY = gql`
  query ChatroomPuzzle($puzzleId: Int!) {
    sui_hei_puzzle_by_pk(id: $puzzleId) {
      id
      anonymous
      sui_hei_user {
        id
      }
    }
  }
`;

export const CHATROOM_ID_QUERY = gql`
  query ChatroomId($chatroomName: String) {
    sui_hei_chatroom(where: { name: { _eq: $chatroomName } }, limit: 1) {
      id
    }
  }
`;

export const CHATROOM_DESCRIPTION_QUERY = gql`
  query ChatroomDescription($chatroomId: Int!) {
    sui_hei_chatroom_by_pk(id: $chatroomId) {
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;

export const CHATROOM_ID_DESCRIPTION_QUERY = gql`
  query ChatroomIdDescription($chatroomName: String) {
    sui_hei_chatroom(where: { name: { _eq: $chatroomName } }, limit: 1) {
      id
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;

export const FAVORITE_CHATROOMS_QUERY = gql`
  query FavoriteChatroomsQuery {
    sui_hei_favoritechatroom {
      id
      sui_hei_chatroom {
        id
        name
      }
    }
  }
`;
