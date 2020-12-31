import React, { useState, useEffect, useRef } from 'react';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';
import * as settingReducer from 'reducers/setting';
import * as loginReducer from 'reducers/login';

import { Query, Mutation } from '@apollo/react-components';
import {
  DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
  DIRECT_MESSAGE_GROUP_QUERY,
} from 'graphql/Queries/Directmessage';
import { DIRECT_MESSAGE_SEND_MUTATION } from 'graphql/Mutations/Directmessage';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';
import authMessages from 'messages/components/auth';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';
import Directmessage from 'components/Chat/Directmessage';
import SimpleLegacyEditor from 'components/PreviewEditor/Legacy/simple';

import {
  StateType,
  SendMessageTriggerType,
  GlobalUserType,
  ActionContentType,
} from 'reducers/types';
import { MessageGroupChatProps, MessageGroupChatInnerProps } from './types';
import {
  DirectMessageGroupMessagesQuery,
  DirectMessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectMessageGroupMessagesQuery';
import { stampNamespaces } from 'stamps/types';
import {
  DirectMessageSendMutation,
  DirectMessageSendMutationVariables,
} from 'graphql/Mutations/generated/DirectMessageSendMutation';
import {
  DirectMessageGroupQueryVariables,
  DirectMessageGroupQuery,
} from 'graphql/Queries/generated/DirectMessageGroupQuery';

const DIRECT_MESSAGES_PER_PAGE = 20;

const MessageGroupChatInner = ({
  user,
  directGroupUser,
  loading,
  data,
  error,
  fetchMore,
  sendDirectmessageTrigger,
}: MessageGroupChatInnerProps) => {
  const [hasMore, setHasMore] = useState(false);
  const editorRef = useRef<SimpleLegacyEditor>(null!);

  const { id: userId } = user;

  useEffect(() => {
    if (loading || error || !data || !data.direct_message) return;
    const { direct_message: direct_messages } = data;

    if (direct_messages.length >= DIRECT_MESSAGES_PER_PAGE) setHasMore(true);
    /* TODO add notification when new direct message received
    if (direct_messages.length > 0)
      direct_messageUpdate(chatroomId, direct_messages[direct_messages.length - 1].id);
     */
  }, [directGroupUser, loading]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.direct_message) {
    if (loading) return <Loading centered />;
    return null;
  }
  const { direct_message: direct_messages } = data;

  if (userId === directGroupUser)
    return (
      <Flex
        flexGrow={1}
        flexWrap="wrap"
        border="3px solid"
        borderRadius={1}
        borderColor="orange.5"
        bg="orange.3"
        p={2}
        mb={2}
      >
        <FormattedMessage {...chatMessages.noSelfDM} />
      </Flex>
    );

  return (
    <React.Fragment>
      <Mutation<DirectMessageSendMutation, DirectMessageSendMutationVariables>
        mutation={DIRECT_MESSAGE_SEND_MUTATION}
        update={(cache, { data }) => {
          if (!data) return;
          if (data.insert_direct_message === null) return;
          const newMessages = data.insert_direct_message.returning;
          if (newMessages.length === 0) return;
          const newMessage = newMessages[0];

          // update messages
          const dmResult = cache.readQuery<
            DirectMessageGroupMessagesQuery,
            DirectMessageGroupMessagesQueryVariables
          >({
            query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
            variables: {
              userId,
              withUserId: directGroupUser,
            },
          });
          if (dmResult === null) return;
          const { direct_message } = dmResult;
          if (newMessage.id === -1) {
            cache.writeQuery({
              query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
              variables: {
                userId,
                withUserId: directGroupUser,
              },
              data: {
                direct_message: [newMessage, ...direct_message],
              },
            });
          } else {
            cache.writeQuery({
              query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
              variables: {
                userId,
                withUserId: directGroupUser,
              },
              data: {
                direct_message: upsertItem(
                  direct_message,
                  newMessage,
                  'id',
                  'desc',
                ),
              },
            });
          }

          // update message groups
          const cachedResult = cache.readQuery<
            DirectMessageGroupQuery,
            DirectMessageGroupQueryVariables
          >({
            query: DIRECT_MESSAGE_GROUP_QUERY,
            variables: {
              userId,
            },
          });
          if (cachedResult === null) return;
          const { direct_message_group } = cachedResult;
          cache.writeQuery({
            query: DIRECT_MESSAGE_GROUP_QUERY,
            variables: {
              userId,
            },
            data: {
              direct_message_group: upsertItem(
                direct_message_group,
                {
                  __typename: 'hasura_direct_message_group_trigger',
                  last_dm_id: newMessage.id,
                  user_id: newMessage.receiver.id,
                  user: {
                    ...newMessage.receiver,
                  },
                },
                'user_id',
              ),
            },
          });
        }}
      >
        {sendDirect => {
          const handleSubmit = (content: string) => {
            if (content.trim() === '') return;
            return sendDirect({
              variables: {
                content: content.trim(),
                receiverId: directGroupUser,
              },
              optimisticResponse: {
                insert_direct_message: {
                  __typename: 'direct_message_mutation_response',
                  returning: [
                    {
                      __typename: 'direct_message',
                      id: -1,
                      content,
                      created: Date.now(),
                      editTimes: 0,
                      sender: {
                        __typename: 'user',
                        id: user.id,
                        icon: user.icon,
                        nickname: user.nickname || '...',
                        username: user.username || '...',
                        currentAward: null,
                      },
                      receiver: {
                        __typename: 'user',
                        id: -1,
                        icon: user.icon,
                        nickname: '...',
                        username: '...',
                        currentAward: null,
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
            const result = handleSubmit(content);
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
            <Flex
              flexGrow={1}
              flexWrap="wrap"
              border="3px solid"
              borderRadius={1}
              borderColor="orange.5"
              bg="orange.3"
              mb={2}
            >
              <SimpleLegacyEditor
                ref={editorRef}
                useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (
                    sendDirectmessageTrigger & SendMessageTriggerType.ON_ENTER
                  ) {
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
                  if (
                    sendDirectmessageTrigger &
                    SendMessageTriggerType.ON_CTRL_ENTER
                  ) {
                    if (e.nativeEvent.keyCode === 13 && e.nativeEvent.ctrlKey) {
                      handleSubmitWithError(editorRef.current.getText());
                      e.preventDefault();
                      return;
                    }
                  }
                  if (
                    sendDirectmessageTrigger &
                    SendMessageTriggerType.ON_SHIFT_ENTER
                  ) {
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
            </Flex>
          );
        }}
      </Mutation>
      <Flex
        borderRadius={2}
        py={2}
        bg="orange.1"
        border="3px solid"
        borderColor="orange.3"
        flexDirection="column"
      >
        {direct_messages.length === 0 && (
          <FormattedMessage {...chatMessages.noLogs} />
        )}
        {direct_messages.map(dm => (
          <Directmessage key={dm.id} direct_message={dm} />
        ))}
        {hasMore && (
          <Box width={1} bg="teal.5">
            <ButtonTransparent
              py={2}
              width={1}
              color="teal.0"
              fontWeight="bold"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: direct_messages.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (fetchMoreResult.direct_message.length === 0)
                      setHasMore(false);
                    return Object.assign({}, prev, {
                      direct_message: [
                        ...prev.direct_message,
                        ...fetchMoreResult.direct_message,
                      ],
                    });
                  },
                });
              }}
            >
              Load More
            </ButtonTransparent>
          </Box>
        )}
      </Flex>
    </React.Fragment>
  );
};

const MessageGroupChat = ({
  user,
  directGroupUser,
  sendDirectmessageTrigger,
  setTrueLoginModal,
  setTrueSignupModal,
}: MessageGroupChatProps) =>
  directGroupUser && user.id ? (
    <Query<
      DirectMessageGroupMessagesQuery,
      DirectMessageGroupMessagesQueryVariables
    >
      query={DIRECT_MESSAGE_GROUP_MESSAGES_QUERY}
      variables={{
        userId: user.id,
        withUserId: directGroupUser,
        limit: DIRECT_MESSAGES_PER_PAGE,
      }}
    >
      {params => (
        <MessageGroupChatInner
          user={user as Required<GlobalUserType>}
          directGroupUser={directGroupUser}
          sendDirectmessageTrigger={sendDirectmessageTrigger}
          {...params}
        />
      )}
    </Query>
  ) : (
    <FormattedMessage
      {...commonMessages.loginOrSignup}
      values={{
        login: (
          <ButtonTransparent
            color="orange.8"
            px={1}
            onClick={() => setTrueLoginModal()}
          >
            <FormattedMessage {...authMessages.login} />
          </ButtonTransparent>
        ),
        signup: (
          <ButtonTransparent
            color="orange.8"
            px={1}
            onClick={() => setTrueSignupModal()}
          >
            <FormattedMessage {...authMessages.signup} />
          </ButtonTransparent>
        ),
      }}
    />
  );

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  directGroupUser: directReducer.rootSelector(state).directGroupUser,
  sendDirectmessageTrigger: settingReducer.rootSelector(state)
    .sendDirectmessageTrigger,
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

export default withRedux(MessageGroupChat);
