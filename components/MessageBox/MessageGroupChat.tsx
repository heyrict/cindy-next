import React, { useState, useEffect, useRef } from 'react';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';
import * as settingReducer from 'reducers/setting';
import * as loginReducer from 'reducers/login';

import { Query, Mutation } from 'react-apollo';
import {
  DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
  DIRECTMESSAGE_GROUP_QUERY,
} from 'graphql/Queries/Directmessage';
import { DIRECTMESSAGE_SEND_MUTATION } from 'graphql/Mutations/Directmessage';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';
import authMessages from 'messages/components/auth';

import { Flex, Box, ButtonTransparent } from 'components/General';
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
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupMessagesQuery';
import { stampNamespaces } from 'stamps/types';
import {
  DirectmessageSendMutation,
  DirectmessageSendMutationVariables,
} from 'graphql/Mutations/generated/DirectmessageSendMutation';
import {
  DirectmessageGroupQueryVariables,
  DirectmessageGroupQuery,
} from 'graphql/Queries/generated/DirectmessageGroupQuery';

const DIRECTMESSAGES_PER_PAGE = 20;

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
    if (loading || error || !data || !data.sui_hei_directmessage) return;
    const { sui_hei_directmessage: directmessages } = data;

    if (directmessages.length >= DIRECTMESSAGES_PER_PAGE) setHasMore(true);
    /* TODO add notification when new direct message received
    if (directmessages.length > 0)
      directmessageUpdate(chatroomId, directmessages[directmessages.length - 1].id);
     */
  }, [directGroupUser, loading]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.sui_hei_directmessage) return null;
  const { sui_hei_directmessage: directmessages } = data;

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
      <Mutation<DirectmessageSendMutation, DirectmessageSendMutationVariables>
        mutation={DIRECTMESSAGE_SEND_MUTATION}
        update={(cache, { data }) => {
          if (data === undefined) return;
          if (data.insert_sui_hei_directmessage === null) return;
          const newMessages = data.insert_sui_hei_directmessage.returning;
          if (newMessages.length === 0) return;
          const newMessage = newMessages[0];

          // update messages
          const dmResult = cache.readQuery<
            DirectmessageGroupMessagesQuery,
            DirectmessageGroupMessagesQueryVariables
          >({
            query: DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
            variables: {
              userId,
              withUserId: directGroupUser,
            },
          });
          if (dmResult === null) return;
          const { sui_hei_directmessage } = dmResult;
          if (newMessage.id === -1) {
            cache.writeQuery({
              query: DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
              variables: {
                userId,
                withUserId: directGroupUser,
              },
              data: {
                sui_hei_directmessage: [newMessage, ...sui_hei_directmessage],
              },
            });
          } else {
            cache.writeQuery({
              query: DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
              variables: {
                userId,
                withUserId: directGroupUser,
              },
              data: {
                sui_hei_directmessage: upsertItem(
                  sui_hei_directmessage,
                  newMessage,
                  'id',
                  'desc',
                ),
              },
            });
          }

          // update message groups
          const cachedResult = cache.readQuery<
            DirectmessageGroupQuery,
            DirectmessageGroupQueryVariables
          >({
            query: DIRECTMESSAGE_GROUP_QUERY,
            variables: {
              userId,
            },
          });
          if (cachedResult === null) return;
          const { direct_message_group } = cachedResult;
          cache.writeQuery({
            query: DIRECTMESSAGE_GROUP_QUERY,
            variables: {
              userId,
            },
            data: {
              direct_message_group: upsertItem(
                direct_message_group,
                {
                  __typename: 'hasura_directmessage_group_trigger',
                  last_dm_id: newMessage.id,
                  user_id: newMessage.receiver.id,
                  sui_hei_user: {
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
            if (content.trim() === '')
              return new Promise(resolve => resolve()) as Promise<void>;
            return sendDirect({
              variables: {
                content: content.trim(),
                receiverId: directGroupUser,
              },
              optimisticResponse: {
                insert_sui_hei_directmessage: {
                  __typename: 'sui_hei_directmessage_mutation_response',
                  returning: [
                    {
                      __typename: 'sui_hei_directmessage',
                      id: -1,
                      content,
                      created: Date.now(),
                      editTimes: 0,
                      sender: {
                        __typename: 'sui_hei_user',
                        id: user.id,
                        nickname: user.nickname || '...',
                        username: user.username || '...',
                        sui_hei_current_useraward: null,
                      },
                      receiver: {
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
        {directmessages.length === 0 && (
          <FormattedMessage {...chatMessages.noLogs} />
        )}
        {directmessages.map(dm => (
          <Directmessage key={dm.id} directmessage={dm} />
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
                    offset: directmessages.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (fetchMoreResult.sui_hei_directmessage.length === 0)
                      setHasMore(false);
                    return Object.assign({}, prev, {
                      sui_hei_directmessage: [
                        ...prev.sui_hei_directmessage,
                        ...fetchMoreResult.sui_hei_directmessage,
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
      DirectmessageGroupMessagesQuery,
      DirectmessageGroupMessagesQueryVariables
    >
      query={DIRECTMESSAGE_GROUP_MESSAGES_QUERY}
      variables={{
        userId: user.id,
        withUserId: directGroupUser,
        limit: DIRECTMESSAGES_PER_PAGE,
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
