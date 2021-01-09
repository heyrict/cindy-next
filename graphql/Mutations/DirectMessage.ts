import { gql } from '@apollo/client';

import { DIRECT_MESSAGE_BRIEF } from 'graphql/Fragments/DirectMessage';

export const UPSERT_DM_READ_MUTATION = gql`
  mutation UpsertDmReadMutation($userId: Int!, $withUserId: Int!, $dmId: Int!) {
    upsertDmRead(
      data: { userId: $userId, withUserId: $withUserId, dmId: $dmId }
    ) {
      id
      userId
      withUserId
      dmId
    }
  }
`;

export const SEND_DIRECT_MESSAGE_MUTATION = gql`
  mutation SendDirectMessageMutation($receiverId: Int!, $content: String!) {
    createDirectMessage(data: { content: $content, receiverId: $receiverId }) {
      ...DirectMessageBrief
    }
  }
  ${DIRECT_MESSAGE_BRIEF}
`;

export const UPDATE_DIRECT_MESSAGE_MUTATION = gql`
  mutation UpdateDirectMessageMutation($id: Int!, $content: String!) {
    updateDirectMessage(id: $id, set: { content: $content }) {
      ...DirectMessageBrief
    }
  }
  ${DIRECT_MESSAGE_BRIEF}
`;
