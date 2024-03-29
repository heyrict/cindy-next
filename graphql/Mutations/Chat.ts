import { gql } from '@apollo/client';

import { CHATMESSAGE_FRAGMENT, CHATROOM_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_SEND_MESSAGE_MUTATION = gql`
  mutation ChatroomSendMessage($content: String!, $chatroomId: Int!) {
    createChatmessage(data: { chatroomId: $chatroomId, content: $content }) {
      ...Chatmessage
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_EDIT_MESSAGE_MUTATION = gql`
  mutation ChatroomEditMessage($chatmessageId: Int!, $content: String) {
    updateChatmessage(id: $chatmessageId, set: { content: $content }) {
      ...Chatmessage
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const INSERT_FAVORITE_CHATROOM_MUTATION = gql`
  mutation InsertFavoriteChatroomMutation($chatroomId: Int!) {
    createFavchat(data: { chatroomId: $chatroomId }) {
      id
      chatroom {
        id
        name
      }
    }
  }
`;

export const DELETE_FAVORITE_CHATROOM_MUTATION = gql`
  mutation DeleteFavoriteChatroomMutation($favchatId: Int!) {
    deleteFavchat(id: $favchatId) {
      id
    }
  }
`;

export const CREATE_CHATROOM_MUTATION = gql`
  mutation CreateChatroomMutation(
    $name: String!
    $description: String!
    $public: Boolean!
  ) {
    createChatroom(
      data: { name: $name, description: $description, public: $public }
    ) {
      ...Chatroom
    }
  }
  ${CHATROOM_FRAGMENT}
`;

export const UPDATE_CHATROOM_DESCRIPTION_MUTATION = gql`
  mutation UpdateChatroomDescriptionMutation(
    $chatroomId: Int!
    $description: String!
    $public: Boolean!
  ) {
    updateChatroom(
      id: $chatroomId
      set: { description: $description, public: $public }
    ) {
      id
      description
      public
    }
  }
`;
