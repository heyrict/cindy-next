import gql from 'graphql-tag';

import { DIRECTMESSAGE_FRAGMENT } from '../Fragments/Directmessage';

export const DIRECTMESSAGE_SEND_MUTATION = gql`
  mutation DirectmessageSendMutation($content: String, $receiverId: Int) {
    insert_sui_hei_directmessage(
      objects: [{ content: $content, receiver_id: $receiverId }]
    ) {
      returning {
        ...Directmessage
      }
    }
  }
  ${DIRECTMESSAGE_FRAGMENT}
`;

export const DIRECTMESSAGE_EDIT_MUTATION = gql`
  mutation DirectmessageEditMutation($directmessageId: Int, $content: String) {
    update_sui_hei_directmessage(
      _inc: { editTimes: 1 }
      _set: { content: $content }
      where: { id: { _eq: $directmessageId } }
    ) {
      returning {
        ...Directmessage
      }
    }
  }
  ${DIRECTMESSAGE_FRAGMENT}
`;
