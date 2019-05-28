import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Mutation } from 'react-apollo';
import { ChatRoomChatmessagesQuery } from 'graphql/Queries/Chat';
import { ChatRoomSendMessageMutation } from 'graphql/Mutations/Chat';

import ChatInput from '../ChatInput';

const LoginRequiredBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${p => p.theme.heights.chatinput};
  background-color: ${p => p.theme.colors.orange[5]};
  color: ${p => p.theme.colors.white};
  font-weight: bold;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ChatRoomInput = ({ user, chatroomId }) =>
  user.id ? (
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
        />
      )}
    </Mutation>
  ) : (
    <LoginRequiredBlock>You need login to send messages</LoginRequiredBlock>
  );

ChatRoomInput.propTypes = {
  chatroomId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatRoomInput);
