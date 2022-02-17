import React, { useRef } from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';
import { upsertItem } from 'common/update';

import ButtonTransparent from 'components/General/ButtonTransparent';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';
import * as loginReducer from 'reducers/login';

import { useMutation } from '@apollo/client';
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
import { LegacyEditorPreviewMode } from 'components/PreviewEditor/Legacy/types';

const LoginRequiredBlock = styled.div`
  height: ${p => p.theme.sizes.chatinput};
  padding: ${p => p.theme.space[1]}px ${p => p.theme.space[2]}px;
  background-color: ${p => p.theme.colors.preset.menubar.bg};
  color: ${p => p.theme.colors.preset.menubar.fg};
  font-weight: bold;
`;

const ChatRoomInput = ({
  user,
  chatroomId,
  sendChatTrigger,
  setTrueLoginModal,
  setTrueSignupModal,
}: ChatRoomInputProps) => {
  const editorRef = useRef<SimpleLegacyEditor>(null);

  const text = editorRef.current ? editorRef.current.getText() : '';

  const [sendMessage] = useMutation<
    ChatroomSendMessage,
    ChatroomSendMessageVariables
  >(CHATROOM_SEND_MESSAGE_MUTATION, {
    update: (cache, { data }) => {
      if (!data) return;
      if (data.createChatmessage === null) return;
      const newMessages = data.createChatmessage;
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
      const { chatmessages } = cachedResult;
      cache.writeQuery({
        query: CHATROOM_CHATMESSAGES_QUERY,
        variables: {
          chatroomId,
        },
        data: {
          chatmessages: upsertItem(chatmessages, newMessages, 'id', 'desc'),
        },
      });
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      if (editorRef.current) {
        editorRef.current.setText(text);
      }
    },
  });

  const handleSubmit = (content: string) => {
    if (content.trim() !== '') {
      return sendMessage({
        variables: {
          content: content.trim(),
          chatroomId,
        },
        optimisticResponse: {
          createChatmessage: {
            __typename: 'Chatmessage',
            id: -1,
            content,
            created: Date.now(),
            modified: Date.now(),
            editTimes: 0,
            user: {
              __typename: 'User',
              id: -1,
              icon: null,
              nickname: '...',
              username: '...',
              currentAward: null,
              defaultLicenseId: null,
            },
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
    if (!result) {
      // Cancelled
      editorRef.current.setText(text);
    }
  };

  return user.id ? (
    <SimpleLegacyEditor
      ref={editorRef}
      useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!editorRef.current) return;
        if (sendChatTrigger & SendMessageTriggerType.ON_ENTER) {
          if (
            e.nativeEvent.key === 'Enter' &&
            !e.nativeEvent.shiftKey &&
            !e.nativeEvent.ctrlKey
          ) {
            handleSubmitWithError(editorRef.current.getText());
            e.preventDefault();
            return;
          }
        }
        if (sendChatTrigger & SendMessageTriggerType.ON_CTRL_ENTER) {
          if (e.nativeEvent.key === 'Enter' && e.nativeEvent.ctrlKey) {
            handleSubmitWithError(editorRef.current.getText());
            e.preventDefault();
            return;
          }
        }
        if (sendChatTrigger & SendMessageTriggerType.ON_SHIFT_ENTER) {
          if (e.nativeEvent.key === 'Enter' && e.nativeEvent.shiftKey) {
            handleSubmitWithError(editorRef.current.getText());
            e.preventDefault();
            return;
          }
        }
      }}
      onSubmit={handleSubmit}
      previewMode={LegacyEditorPreviewMode.line2md}
    />
  ) : (
    <LoginRequiredBlock>
      <FormattedMessage
        {...commonMessages.loginOrSignup}
        values={{
          login: (
            <ButtonTransparent
              color="blue.7"
              px={1}
              onClick={() => setTrueLoginModal()}
            >
              <FormattedMessage {...authMessages.login} />
            </ButtonTransparent>
          ),
          signup: (
            <ButtonTransparent
              color="blue.7"
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

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ChatRoomInput);
