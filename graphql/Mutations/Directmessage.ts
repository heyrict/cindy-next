import gql from 'graphql-tag';

import { DIRECT_MESSAGE_FRAGMENT } from '../Fragments/DirectMessage';

export const DIRECT_MESSAGE_SEND_MUTATION = gql`
  mutation DirectMessageSendMutation($content: String, $receiverId: Int) {
    insert_direct_message(
      objects: [{ content: $content, receiver_id: $receiverId }]
    ) {
      returning {
        ...DirectMessage
      }
    }
  }
  ${DIRECT_MESSAGE_FRAGMENT}
`;

export const DIRECT_MESSAGE_EDIT_MUTATION = gql`
  mutation DirectMessageEditMutation($directmessageId: Int, $content: String) {
    update_direct_message(
      _inc: { editTimes: 1 }
      _set: { content: $content }
      where: { id: { _eq: $directmessageId } }
    ) {
      returning {
        ...DirectMessage
      }
    }
  }
  ${DIRECT_MESSAGE_FRAGMENT}
`;
