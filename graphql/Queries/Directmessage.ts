import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { DIRECT_MESSAGE_FRAGMENT } from '../Fragments/DirectMessage';

export const DIRECT_MESSAGE_GROUP_QUERY = gql`
  query DirectMessageGroupQuery($userId: Int!) {
    direct_message_group(
      args: { user_id: $userId }
      order_by: { last_dm_id: desc }
    ) {
      last_dm_id
      user_id
      user {
        ...UserBrief
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const DIRECT_MESSAGE_GROUP_MESSAGES_QUERY = gql`
  query DirectMessageGroupMessagesQuery(
    $userId: Int!
    $withUserId: Int!
    $limit: Int
    $offset: Int
  ) {
    direct_message(
      where: {
        _or: [
          { sender_id: { _eq: $userId }, receiver_id: { _eq: $withUserId } }
          { sender_id: { _eq: $withUserId }, receiver_id: { _eq: $userId } }
        ]
      }
      limit: $limit
      offset: $offset
      order_by: [{ id: desc }]
    ) @connection(key: "direct_message", filter: ["where"]) {
      ...DirectMessage
    }
  }
  ${DIRECT_MESSAGE_FRAGMENT}
`;
