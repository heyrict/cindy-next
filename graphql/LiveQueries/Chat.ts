import gql from 'graphql-tag';

import { CHATMESSAGE_FRAGMENT } from '../Fragments/Chat';

export const CHATROOM_CHATMESSAGES_LIVE_QUERY = gql`
  subscription ChatroomChatmessageLiveQuery($chatroomId: Int!, $limit: Int!) {
    chatmessage(
      where: { chatroom_id: { _eq: $chatroomId } }
      limit: $limit
      order_by: [{ modified: desc }, { id: desc }]
    ) {
      ...Chatmessage
    }
  }
  ${CHATMESSAGE_FRAGMENT}
`;
