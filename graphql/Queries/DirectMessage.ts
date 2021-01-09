import { gql } from '@apollo/client';

import { DIRECT_MESSAGE_BRIEF } from '../Fragments/DirectMessage';

export const DM_READ_ALL_QUERY = gql`
  query DmReadAllQuery($userId: Int!, $limit: Int!, $offset: Int!) {
    dmReadAll(userId: $userId, limit: $limit, offset: $offset) {
      withUser {
        id
        nickname
      }
      dmId
      directMessageId
    }
  }
`;

export const DIRECT_MESSAGE_GROUP_MESSAGES_QUERY = gql`
  query DirectMessageGroupMessagesQuery(
    $userId: Int!
    $withUserId: Int!
    $limit: Int!
    $offset: Int!
  ) {
    directMessages(
      filter: [
        { senderId: { eq: $userId }, receiverId: { eq: $withUserId } }
        { senderId: { eq: $withUserId }, receiverId: { eq: $userId } }
      ]
      order: { id: DESC }
      limit: $limit
      offset: $offset
    ) {
      ...DirectMessageBrief
    }
  }
  ${DIRECT_MESSAGE_BRIEF}
`;
