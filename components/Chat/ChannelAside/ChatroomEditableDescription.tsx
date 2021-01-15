import React from 'react';
import { toast } from 'react-toastify';

import { Query } from '@apollo/client/react/components';
import { CHATROOM_DESCRIPTION_QUERY } from 'graphql/Queries/Chat';

import ChatroomDescriptionInner from './ChatroomDescriptionInner';

import {
  ChatroomDescription,
  ChatroomDescriptionVariables,
} from 'graphql/Queries/generated/ChatroomDescription';
import { ChatroomEditableDescriptionProps } from 'components/Chat/ChannelAside/types';

const ChatroomEditableDescription = ({
  chatroomId,
}: ChatroomEditableDescriptionProps) => {
  return (
    <Query<ChatroomDescription, ChatroomDescriptionVariables>
      query={CHATROOM_DESCRIPTION_QUERY}
      variables={{
        chatroomId,
      }}
    >
      {({ error, data }) => {
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (!data || !data.chatroom) return null;
        const chatroom = data.chatroom;

        return <ChatroomDescriptionInner chatroom={chatroom} />;
      }}
    </Query>
  );
};

export default ChatroomEditableDescription;
