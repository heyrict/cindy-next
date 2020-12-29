import React, { useRef } from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import ButtonTransparent from 'components/General/ButtonTransparent';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';
import * as loginReducer from 'reducers/login';

import { Mutation } from '@apollo/react-components';
import { CHATROOM_CHATMESSAGES_QUERY } from 'graphql/Queries/Chat';
import { CHATROOM_SEND_MESSAGE_MUTATION } from 'graphql/Mutations/Chat';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import authMessages from 'messages/components/auth';

import { SimpleLegacyEditor } from 'components/PreviewEditor';

import {
  ChatroomSendMessage,
  ChatroomSendMessageVariables,
} from 'graphql/Mutations/generated/ChatroomSendMessage';
import { ChatRoomInputProps } from './types';
import {
  StateType,
  SendMessageTriggerType,
  ActionContentType,
} from 'reducers/types';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';
import { stampNamespaces } from 'stamps';
import { upsertMultipleItem } from 'common/update';

const LoginRequiredBlock = styled.div`
  height: ${p => p.theme.sizes.chatinput};
  padding: ${p => p.theme.space[1]}px ${p => p.theme.space[2]}px;
  background-color: ${p => p.theme.colors.orange[5]};
  color: ${p => p.theme.colors.white};
  font-weight: bold;
`;

const ChatRoomInput = ({
  user,
  chatroomId,
  sendChatTrigger,
  setTrueLoginModal,
  setTrueSignupModal,
}: ChatRoomInputProps) => {
  const editorRef = useRef<SimpleLegacyEditor>(null!);

  return user.id ? (
    <Mutation<ChatroomSendMessage, ChatroomSendMessageVariables>
      mutation={CHATROOM_SEND_MESSAGE_MUTATION}
      update={(cache, { data }) => {
        if (!data) return;
        if (data.insert_chatmessage === null) return;
        const newMessages = data.insert_chatmessage.returning;
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
        const { chatmessage } = cachedResult;
        cache.writeQuery({
          query: CHATROOM_CHATMESSAGES_QUERY,
          variables: {
            chatroomId,
          },
          data: {
            chatmessage: upsertMultipleItem(
              chatmessage,
              newMessages,
              'id',
              'desc',
            ),
          },
        });
      }}
    >
      {sendMessage => {
        const handleSubmit = (content: string) => {
          if (content.trim() !== '') {
            return sendMessage({
              variables: {
                content: content.trim(),
                chatroomId,
              },
              optimisticResponse: {
                insert_chatmessage: {
                  __typename: 'chatmessage_mutation_response',
                  returning: [
                    {
                      __typename: 'chatmessage',
                      id: -1,
                      content,
                      created: Date.now(),
                      editTimes: 0,
                      user: {
                        __typename: 'user',
                        id: -1,
                        icon: null,
                        nickname: '...',
                        username: '...',
                        current_user_award: null,
                      },
                    },
                  ],
                },
              },
            });
          }
        };

        const handleSubmitWithError = (content: string) => {
          if (!editorRef.current) return;
          const text = editorRef.current.getText();
          editorRef.current.setText('');
          let result = handleSubmit(content);
          if (result) {
            result
              .then(returns => {
                if (returns.errors) {
                  toast.error(JSON.stringify(returns.errors));
                  editorRef.current.setText(text);
                }
              })
              .catch(error => {
                toast.error(JSON.stringify(error));
                editorRef.current.setText(text);
              });
          } else {
            // Cancelled
            editorRef.current.setText(text);
          }
        };

        return (
          <SimpleLegacyEditor
            ref={editorRef}
            useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (sendChatTrigger & SendMessageTriggerType.ON_ENTER) {
                if (
                  e.nativeEvent.keyCode === 13 &&
                  !e.nativeEvent.shiftKey &&
                  !e.nativeEvent.ctrlKey
                ) {
                  handleSubmitWithError(editorRef.current.getText());
                  e.preventDefault();
                  return;
                }
              }
              if (sendChatTrigger & SendMessageTriggerType.ON_CTRL_ENTER) {
                if (e.nativeEvent.keyCode === 13 && e.nativeEvent.ctrlKey) {
                  handleSubmitWithError(editorRef.current.getText());
                  e.preventDefault();
                  return;
                }
              }
              if (sendChatTrigger & SendMessageTriggerType.ON_SHIFT_ENTER) {
                if (e.nativeEvent.keyCode === 13 && e.nativeEvent.shiftKey) {
                  handleSubmitWithError(editorRef.current.getText());
                  e.preventDefault();
                  return;
                }
              }
            }}
            onSubmit={handleSubmit}
          />
        );
      }}
    </Mutation>
  ) : (
    <LoginRequiredBlock>
      <FormattedMessage
        {...commonMessages.loginOrSignup}
        values={{
          login: (
            <ButtonTransparent
              color="blue.0"
              px={1}
              onClick={() => setTrueLoginModal()}
            >
              <FormattedMessage {...authMessages.login} />
            </ButtonTransparent>
          ),
          signup: (
            <ButtonTransparent
              color="blue.0"
              px={1}
              onClick={() => setTrueSignupModal()}
            >
              <FormattedMessage {...authMessages.signup} />
            </ButtonTransparent>
          ),
        }}
      />
    </LoginRequiredBlock>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  sendChatTrigger: settingReducer.rootSelector(state).sendChatTrigger,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.loginModal.setTrue()),
  setTrueSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setTrue()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatRoomInput);
