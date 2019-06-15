import React from 'react';
import styled from 'theme/styled';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Mutation } from 'react-apollo';
import { CHATROOM_CHATMESSAGES_QUERY } from 'graphql/Queries/Chat';
import { CHATROOM_SEND_MESSAGE_MUTATION } from 'graphql/Mutations/Chat';

import SimpleEditor from 'components/PreviewEditor/simple';

import {
  ChatroomSendMessage,
  ChatroomSendMessageVariables,
} from 'graphql/Mutations/generated/ChatroomSendMessage';
import { ChatRoomInputProps } from './types';
import { StateType } from 'reducers/types';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';

const LoginRequiredBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${p => p.theme.sizes.chatinput};
  background-color: ${p => p.theme.colors.orange[5]};
  color: ${p => p.theme.colors.white};
  font-weight: bold;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ChatRoomInput = ({ user, chatroomId }: ChatRoomInputProps) =>
  user.id ? (
    <Mutation<ChatroomSendMessage, ChatroomSendMessageVariables>
      mutation={CHATROOM_SEND_MESSAGE_MUTATION}
      update={(cache, { data }) => {
        if (data === undefined) return;
        if (data.insert_sui_hei_chatmessage === null) return;
        const newMessages = data.insert_sui_hei_chatmessage.returning;
        const cachedResult = cache.readQuery<
          ChatroomChatmessages,
          ChatroomChatmessagesVariables
        >({
          query: CHATROOM_CHATMESSAGES_QUERY,
          variables: {
            chatroomId,
          },
        });
        if (cachedResult === null) return;
        const { sui_hei_chatmessage } = cachedResult;
        cache.writeQuery({
          query: CHATROOM_CHATMESSAGES_QUERY,
          variables: {
            chatroomId,
          },
          data: {
            sui_hei_chatmessage: [...newMessages, ...sui_hei_chatmessage],
          },
        });
      }}
    >
      {sendMessage => (
        <SimpleEditor
          onSubmit={content => {
            if (content.trim() === '') return;
            sendMessage({
              variables: {
                content,
                chatroomId,
              },
            });
          }}
          autoFocus
        />
      )}
    </Mutation>
  ) : (
    <LoginRequiredBlock>You need login to send messages</LoginRequiredBlock>
  );

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatRoomInput);
