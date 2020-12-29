import gql from 'graphql-tag';

import { CHATMESSAGE_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_SEND_MESSAGE_MUTATION = gql`
  mutation ChatroomSendMessage($content: String, $chatroomId: Int) {
    insert_chatmessage(
      objects: [{ chatroom_id: $chatroomId, content: $content }]
    ) {
      returning {
        ...Chatmessage
      }
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const CHATROOM_EDIT_MESSAGE_MUTATION = gql`
  mutation ChatroomEditMessage($chatmessageId: Int, $content: String) {
    update_chatmessage(
      _inc: { editTimes: 1 }
      _set: { content: $content }
      where: { id: { _eq: $chatmessageId } }
    ) {
      returning {
        ...Chatmessage
      }
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;

export const INSERT_FAVORITE_CHATROOM_MUTATION = gql`
  mutation InsertFavoriteChatroomMutation($chatroomId: Int!) {
    insert_favorite_chatroom(objects: [{ chatroom_id: $chatroomId }]) {
      returning {
        id
        chatroom {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_FAVORITE_CHATROOM_MUTATION = gql`
  mutation DeleteFavoriteChatroomMutation($favoriteChatroomId: Int!) {
    delete_favorite_chatroom(where: { id: { _eq: $favoriteChatroomId } }) {
      affected_rows
    }
  }
`;

export const CREATE_CHATROOM_MUTATION = gql`
  mutation CreateChatroomMutation($name: String!, $description: String!) {
    insert_chatroom(objects: [{ name: $name, description: $description }]) {
      returning {
        id
        name
      }
    }
  }
`;

export const UPDATE_CHATROOM_DESCRIPTION_MUTATION = gql`
  mutation UpdateChatroomDescriptionMutation(
    $chatroomId: Int!
    $description: String!
  ) {
    update_chatroom(
      where: { id: { _eq: $chatroomId } }
      _set: { description: $description }
    ) {
      returning {
        id
        description
      }
    }
  }
`;
