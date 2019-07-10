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

export const CHATROOM_EDIT_MESSAGE_MUTATION = gql`
  mutation ChatroomEditMessage($chatmessageId: Int, $content: String) {
    update_sui_hei_chatmessage(
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
    insert_sui_hei_favoritechatroom(objects: [{ chatroom_id: $chatroomId }]) {
      returning {
        id
        sui_hei_chatroom {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_FAVORITE_CHATROOM_MUTATION = gql`
  mutation DeleteFavoriteChatroomMutation($favoriteChatroomId: Int!) {
    delete_sui_hei_favoritechatroom(
      where: { id: { _eq: $favoriteChatroomId } }
    ) {
      affected_rows
    }
  }
`;
