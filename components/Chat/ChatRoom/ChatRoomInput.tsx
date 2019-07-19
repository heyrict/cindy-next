import React, { useRef } from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';

import { Mutation } from 'react-apollo';
import { CHATROOM_CHATMESSAGES_QUERY } from 'graphql/Queries/Chat';
import { CHATROOM_SEND_MESSAGE_MUTATION } from 'graphql/Mutations/Chat';

import { SimpleLegacyEditor } from 'components/PreviewEditor';

import {
  ChatroomSendMessage,
  ChatroomSendMessageVariables,
} from 'graphql/Mutations/generated/ChatroomSendMessage';
import { ChatRoomInputProps } from './types';
import { StateType, SendMessageTriggerType } from 'reducers/types';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';
import { stampNamespaces } from 'stamps';

const ChatRoomInputWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;

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

const ChatRoomInput = ({
  user,
  chatroomId,
  sendChatTrigger,
}: ChatRoomInputProps) => {
  const editorRef = useRef<SimpleLegacyEditor>(null!);

  return (
    <ChatRoomInputWrapper>
      {user.id ? (
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
          {sendMessage => {
            const handleSubmit = (content: string) => {
              if (content.trim() === '')
                return new Promise(resolve => resolve()) as Promise<void>;
              return sendMessage({
                variables: {
                  content: content.trim(),
                  chatroomId,
                },
                optimisticResponse: {
                  insert_sui_hei_chatmessage: {
                    __typename: 'sui_hei_chatmessage_mutation_response',
                    returning: [
                      {
                        __typename: 'sui_hei_chatmessage',
                        id: -1,
                        content,
                        created: Date.now(),
                        editTimes: 0,
                        sui_hei_user: {
                          __typename: 'sui_hei_user',
                          id: -1,
                          nickname: '...',
                          username: '...',
                          sui_hei_current_useraward: null,
                        },
                      },
                    ],
                  },
                },
              });
            };

            const handleSubmitWithError = (content: string) => {
              if (!editorRef.current) return;
              const text = editorRef.current.getText();
              editorRef.current.setText('');
              handleSubmit(content)
                .then(returns => {
                  if (!returns) {
                    // Cancelled
                    editorRef.current.setText(text);
                    return;
                  }
                  if (returns.errors) {
                    toast.error(JSON.stringify(returns.errors));
                    editorRef.current.setText(text);
                  }
                })
                .catch(error => {
                  toast.error(JSON.stringify(error));
                  editorRef.current.setText(text);
                });
            }

            return (
              <SimpleLegacyEditor
                ref={editorRef}
                useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (sendChatTrigger & SendMessageTriggerType.ON_ENTER) {
                    if (
                      e.nativeEvent.keyCode === 13 &&
                      !e.nativeEvent.shiftKey
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
                    if (
                      e.nativeEvent.keyCode === 13 &&
                      e.nativeEvent.shiftKey
                    ) {
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
        <LoginRequiredBlock>You need login to send messages</LoginRequiredBlock>
      )}
    </ChatRoomInputWrapper>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  sendChatTrigger: settingReducer.rootSelector(state).sendChatTrigger,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatRoomInput);
