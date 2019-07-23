import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { DIRECTMESSAGE_FRAGMENT } from '../Fragments/Directmessage';

export const DIRECTMESSAGE_GROUP_QUERY = gql`
  query DirectmessageGroupQuery($userId: Int!) {
    direct_message_group(
      args: { user_id: $userId }
      order_by: { last_dm_id: desc }
    ) {
      last_dm_id
      user_id
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const DIRECTMESSAGE_GROUP_MESSAGES_QUERY = gql`
  query DirectmessageGroupMessagesQuery(
    $userId: Int!
    $withUserId: Int!
    $limit: Int
    $offset: Int
  ) {
    sui_hei_directmessage(
      where: {
        _or: [
          { sender_id: { _eq: $userId }, receiver_id: { _eq: $withUserId } }
          { sender_id: { _eq: $withUserId }, receiver_id: { _eq: $userId } }
        ]
      }
      limit: $limit
      offset: $offset
      order_by: [{ id: desc }]
    ) @connection(key: "sui_hei_directmessage", filter: ["where"]) {
      ...Directmessage
    }
  }
  ${DIRECTMESSAGE_FRAGMENT}
`;
