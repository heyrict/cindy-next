import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Mutation } from 'react-apollo';
import { ChatRoomSendMessageMutation } from 'graphql/Mutations/Chat';

import { Subscribe } from 'unstated';
import OnlyOneTextContainer from 'containers/reusable/OnlyOneText';
import AuthContainer from 'containers/global/Auth';

import ChatInput from '../ChatInput';

const inputContainer = new OnlyOneTextContainer();

const LoginRequiredBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${p => p.theme.heights.chatinput};
  background-color: ${p => p.theme.colors.kuwacha};
  color: ${p => p.theme.colors.hakuren};
  font-weight: bold;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ChatRoomInput = ({ chatroomId }) => (
  <Subscribe to={[AuthContainer, inputContainer]}>
    {(authCont, inputCont) =>
      authCont.state.user.id ? (
        <Mutation
          mutation={ChatRoomSendMessageMutation}
          update={(cache, { data }) => {
            const newMessages = data.insert_sui_hei_chatmessage.returning;
            const { sui_hei_chatmessage } = cache.readQuery({
              query: ChatRoomChatmessagesQuery,
              variables: {
                chatroomId,
              },
            });
            cache.writeQuery({
              query: ChatRoomChatmessagesQuery,
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
            <ChatInput
              onSend={content => {
                sendMessage({
                  variables: {
                    content,
                    chatroomId,
                  },
                });
              }}
              cont={inputCont}
            />
          )}
        </Mutation>
      ) : (
        <LoginRequiredBlock>You need login to send messages</LoginRequiredBlock>
      )
    }
  </Subscribe>
);

ChatRoomInput.propTypes = {
  chatroomId: PropTypes.number.isRequired,
};

export default ChatRoomInput;
