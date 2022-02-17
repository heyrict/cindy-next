import React, { useState, useEffect, useRef } from 'react';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';
import * as settingReducer from 'reducers/setting';
import * as loginReducer from 'reducers/login';

import { useMutation, useQuery } from '@apollo/client';
import {
  DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
  DM_READ_ALL_QUERY,
} from 'graphql/Queries/DirectMessage';

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
import { stampNamespaces } from 'stamps';
import { SEND_DIRECT_MESSAGE_MUTATION } from 'graphql/Mutations/DirectMessage';
import {
  SendDirectMessageMutation,
  SendDirectMessageMutationVariables,
} from 'graphql/Mutations/generated/SendDirectMessageMutation';
import {
  DmReadAllQuery,
  DmReadAllQueryVariables,
} from 'graphql/Queries/generated/DmReadAllQuery';
import { USER_BRIEF_FRAGMENT } from 'graphql/Fragments/User';
import { UserBrief } from 'graphql/Fragments/generated/UserBrief';
import { DeepNonNullable } from 'globalTypes';

const DIRECT_MESSAGES_PER_PAGE = 20;

const MessageGroupChatInner = ({
  user,
  directGroupUser,
  sendDirectmessageTrigger,
}: MessageGroupChatInnerProps) => {
  const [hasMore, setHasMore] = useState(false);
  const editorRef = useRef<SimpleLegacyEditor>(null!);

  const { id: userId } = user;

  const { loading, data, error, fetchMore } = useQuery<
    DirectMessageGroupMessagesQuery,
    DirectMessageGroupMessagesQueryVariables
  >(DIRECT_MESSAGE_GROUP_MESSAGES_QUERY, {
    variables: {
      userId,
      withUserId: directGroupUser,
      limit: DIRECT_MESSAGES_PER_PAGE,
      offset: 0,
    },
  });

  const [sendDirect] = useMutation<
    SendDirectMessageMutation,
    SendDirectMessageMutationVariables
  >(SEND_DIRECT_MESSAGE_MUTATION, {
    update: (cache, { data }) => {
      if (!data || !data.createDirectMessage) return;
      const directMessage = data.createDirectMessage;

      // update messages
      const dmResult = cache.readQuery<
        DirectMessageGroupMessagesQuery,
        DirectMessageGroupMessagesQueryVariables
      >({
        query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
        variables: {
          userId,
          withUserId: directGroupUser,
        } as DirectMessageGroupMessagesQueryVariables,
      });
      if (dmResult === null) return;
      const { directMessages } = dmResult;
      if (directMessage.id === -1) {
        cache.writeQuery<
          DirectMessageGroupMessagesQuery,
          Omit<DirectMessageGroupMessagesQueryVariables, 'limit' | 'offset'>
        >({
          query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
          variables: {
            userId,
            withUserId: directGroupUser,
          },
          data: {
            directMessages: [directMessage, ...directMessages],
          },
        });
      } else {
        cache.writeQuery<
          DirectMessageGroupMessagesQuery,
          Omit<DirectMessageGroupMessagesQueryVariables, 'limit' | 'offset'>
        >({
          query: DIRECT_MESSAGE_GROUP_MESSAGES_QUERY,
          variables: {
            userId,
            withUserId: directGroupUser,
          },
          data: {
            directMessages: upsertItem(
              directMessages,
              directMessage,
              'id',
              'desc',
            ),
          },
        });
      }

      // update message groups
      if (directMessage.id !== -1) {
        const cachedResult = cache.readQuery<
          DmReadAllQuery,
          DmReadAllQueryVariables
        >({
          query: DM_READ_ALL_QUERY,
          variables: {
            userId,
          } as DmReadAllQueryVariables,
        });
        if (cachedResult === null) return;
        const { dmReadAll } = cachedResult;
        let user = cache.readFragment<UserBrief>({
          fragment: USER_BRIEF_FRAGMENT,
          fragmentName: 'UserBrief',
          id: `User:${directGroupUser}`,
        });
        cache.writeQuery<
          DmReadAllQuery,
          Omit<DmReadAllQueryVariables, 'limit' | 'offset'>
        >({
          query: DM_READ_ALL_QUERY,
          variables: {
            userId,
          },
          data: {
            dmReadAll: upsertItem(
              dmReadAll,
              {
                __typename: 'DmReadAllEntry',
                dmId: directMessage.id,
                directMessageId: directMessage.id,
                withUserId: directGroupUser,
                withUser: {
                  __typename: 'User',
                  id: directGroupUser,
                  nickname: user?.nickname || '...',
                },
              },
              'directMessageId',
              'desc',
            ),
          },
        });
      }
    },
  });

  useEffect(() => {
    if (loading || error || !data || !data.directMessages) return;
    const { directMessages } = data;

    if (directMessages.length >= DIRECT_MESSAGES_PER_PAGE) {
      setHasMore(true);
    }
    /* TODO add notification when new direct message received
    if (directMessages.length > 0)
      direct_messageUpdate(chatroomId, directMessages[directMessages.length - 1].id);
     */
  }, [directGroupUser, loading]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.directMessages) {
    if (loading) return <Loading centered />;
    return null;
  }
  const { directMessages } = data;

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

  const handleSubmit = (content: string) => {
    if (content.trim() === '') return;
    return sendDirect({
      variables: {
        content: content.trim(),
        receiverId: directGroupUser,
      },
      optimisticResponse: {
        createDirectMessage: {
          __typename: 'DirectMessage',
          id: -1,
          content,
          created: Date.now(),
          modified: Date.now(),
          editTimes: 0,
          sender: {
            __typename: 'User',
            id: user.id,
            icon: user.icon,
            nickname: user.nickname || '...',
            username: user.username || '...',
            currentAward: null,
            defaultLicenseId: null,
          },
          receiver: {
            __typename: 'User',
            id: -1,
            icon: user.icon,
            nickname: '...',
            username: '...',
            currentAward: null,
            defaultLicenseId: null,
          },
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
    <>
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
            if (sendDirectmessageTrigger & SendMessageTriggerType.ON_ENTER) {
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
            if (
              sendDirectmessageTrigger & SendMessageTriggerType.ON_CTRL_ENTER
            ) {
              if (e.nativeEvent.key === 'Enter' && e.nativeEvent.ctrlKey) {
                handleSubmitWithError(editorRef.current.getText());
                e.preventDefault();
                return;
              }
            }
            if (
              sendDirectmessageTrigger & SendMessageTriggerType.ON_SHIFT_ENTER
            ) {
              if (e.nativeEvent.key === 'Enter' && e.nativeEvent.shiftKey) {
                handleSubmitWithError(editorRef.current.getText());
                e.preventDefault();
                return;
              }
            }
          }}
          onSubmit={handleSubmit}
        />
      </Flex>
      <Flex
        borderRadius={2}
        py={2}
        bg="orange.1"
        border="3px solid"
        borderColor="orange.3"
        flexDirection="column"
      >
        {directMessages.length === 0 && (
          <FormattedMessage {...chatMessages.noLogs} />
        )}
        {directMessages.map(dm => (
          <Directmessage key={dm.id} directMessage={dm} />
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
                    offset: directMessages.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (fetchMoreResult.directMessages.length === 0)
                      setHasMore(false);
                    return Object.assign({}, prev, {
                      directMessages: [
                        ...prev.directMessages,
                        ...fetchMoreResult.directMessages,
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
    </>
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
    <MessageGroupChatInner
      user={user as DeepNonNullable<GlobalUserType>}
      directGroupUser={directGroupUser}
      sendDirectmessageTrigger={sendDirectmessageTrigger}
    />
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
  sendDirectmessageTrigger:
    settingReducer.rootSelector(state).sendDirectmessageTrigger,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.loginModal.setTrue()),
  setTrueSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setTrue()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(MessageGroupChat);
