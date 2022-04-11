import { gql } from '@apollo/client';

import { CHATMESSAGE_FRAGMENT, CHATROOM_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_CHATMESSAGES_QUERY = gql`
  query ChatroomChatmessages(
    $chatroomId: Int
    $limit: Int
    $offset: Int
    $since: DateTime
  ) {
    chatmessages(
      filter: { chatroomId: { eq: $chatroomId }, modified: { gt: $since } }
      limit: $limit
      offset: $offset
      order: [{ id: DESC }]
    ) @connection(key: "chatmessage", filter: ["filter"]) {
      ...Chatmessage
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_LOGS_QUERY = gql`
  query ChatroomLogsQuery($chatroomId: Int, $limit: Int, $offset: Int) {
    chatmessages(
      filter: { chatroomId: { eq: $chatroomId } }
      limit: $limit
      offset: $offset
      order: [{ id: ASC }]
    ) {
      ...Chatmessage
    }
    chatmessageCount(filter: { chatroomId: { eq: $chatroomId } })
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_PUZZLE_QUERY = gql`
  query ChatroomPuzzle($puzzleId: Int!) {
    puzzle(id: $puzzleId) {
      id
      anonymous
      status
      user {
        id
      }
    }
  }
`;

export const CHATROOM_ID_QUERY = gql`
  query ChatroomId($chatroomName: String) {
    chatrooms(filter: { name: { eq: $chatroomName } }, limit: 1) {
      id
    }
  }
`;

export const CHATROOM_DESCRIPTION_QUERY = gql`
  query ChatroomDescription($chatroomId: Int!) {
    chatroom(id: $chatroomId) {
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;

export const CHATROOM_ID_DESCRIPTION_QUERY = gql`
  query ChatroomIdDescription($chatroomName: String) {
    chatrooms(filter: { name: { eq: $chatroomName } }, limit: 1) {
      id
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;

export const FAVORITE_CHATROOMS_QUERY = gql`
  query FavoriteChatroomsQuery($userId: Int!) {
    favchats(filter: { userId: { eq: $userId } }) {
      id
      chatroom {
        id
        name
      }
    }
  }
`;

export const OFFICIAL_CHATROOMS_QUERY = gql`
  query OfficialChatroomsQuery {
    chatrooms(filter: { official: true }, order: { id: ASC }) {
      id
      name
    }
  }
`;

export const PUBLIC_CHATROOMS_QUERY = gql`
  query PublicChatroomsQuery($limit: Int!, $offset: Int!) {
    chatrooms(
      filter: { public: true }
      order: { id: DESC }
      limit: $limit
      offset: $offset
    ) {
      id
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;
