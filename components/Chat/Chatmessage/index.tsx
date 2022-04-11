import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { line2md } from 'common/markdown';

import { FormattedTime, FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { useMutation } from '@apollo/client';
import { CHATROOM_EDIT_MESSAGE_MUTATION } from 'graphql/Mutations/Chat';

import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';
import { ButtonTransparent, Img, EditTimeSpan, Box } from 'components/General';
import { SimpleLegacyEditor } from 'components/PreviewEditor';

import ChatBubble from './ChatBubble';
import ChatBubbleTop from './ChatBubbleTop';
import pencilIcon from 'svgs/pencil.svg';

import { ChatmessageProps, ChatmessageModeType } from './types';
import { StateType } from 'reducers/types';
import {
  ChatroomEditMessage,
  ChatroomEditMessageVariables,
} from 'graphql/Mutations/generated/ChatroomEditMessage';
import { stampNamespaces } from 'stamps';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Chatmessage = ({
  chatmessage,
  chatroom,
  anonymous,
  currentUserId,
}: ChatmessageProps) => {
  const [mode, setMode] = useState<ChatmessageModeType>(
    ChatmessageModeType.NORMAL,
  );
  const isCreator = currentUserId === chatmessage.user.id;

  const [editMessage] = useMutation<
    ChatroomEditMessage,
    ChatroomEditMessageVariables
  >(CHATROOM_EDIT_MESSAGE_MUTATION, {
    onCompleted: () => {
      setMode(ChatmessageModeType.NORMAL);
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      setMode(ChatmessageModeType.EDIT);
    },
  });

  return (
    <div>
      <ChatBubbleTop>
        {anonymous ? (
          <AnonymousUserInline
            px={1}
            timestamp={
              chatmessage.created && (
                <FormattedTime
                  value={chatmessage.created}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              )
            }
          />
        ) : (
          <UserInline
            px={1}
            user={chatmessage.user}
            timestamp={
              chatmessage.created && (
                <FormattedTime
                  value={chatmessage.created}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              )
            }
          />
        )}
        {chatroom && (
          <Box ml="auto">
            <Link
              href="/channel/[name]"
              as={`/channel/${chatroom.name}`}
              passHref
            >
              <ButtonTransparentA p={1}>{chatroom.name}</ButtonTransparentA>
            </Link>
          </Box>
        )}
      </ChatBubbleTop>
      <ChatBubble orientation={isCreator ? 'right' : 'left'}>
        <div style={{ overflowX: 'auto', overflowY: 'clip', width: '100%' }}>
          {mode === ChatmessageModeType.EDIT && (
            <SimpleLegacyEditor
              useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
              initialValue={chatmessage.content}
              onSubmit={text => {
                if (text === chatmessage.content) {
                  setMode(ChatmessageModeType.NORMAL);
                  return;
                }
                setMode(ChatmessageModeType.NORMAL);
                return editMessage({
                  variables: {
                    chatmessageId: chatmessage.id,
                    content: text,
                  },
                  optimisticResponse: {
                    updateChatmessage: {
                      ...chatmessage,
                      content: text,
                    },
                  },
                });
              }}
            />
          )}
          <span
            dangerouslySetInnerHTML={{ __html: line2md(chatmessage.content) }}
          />
          {chatmessage.editTimes > 0 && (
            <EditTimeSpan>
              <FormattedMessage
                {...commonMessages.editTimes}
                values={{ count: chatmessage.editTimes }}
              />
            </EditTimeSpan>
          )}
          {isCreator && (
            <ButtonTransparent
              onClick={() =>
                setMode(
                  mode === ChatmessageModeType.EDIT
                    ? ChatmessageModeType.NORMAL
                    : ChatmessageModeType.EDIT,
                )
              }
            >
              <Img height="xxs" src={pencilIcon} />
            </ButtonTransparent>
          )}
        </div>
      </ChatBubble>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentUserId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Chatmessage);
