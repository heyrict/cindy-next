import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';
import { upsertMultipleItem } from 'common/update';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import KeepBottom from 'components/Hoc/KeepBottom';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';

import { Query } from '@apollo/client/react/components';
import {
  CHATROOM_CHATMESSAGES_QUERY,
  CHATROOM_PUZZLE_QUERY,
} from 'graphql/Queries/Chat';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import Chatmessage from '../Chatmessage';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';
import {
  ChatroomPuzzle,
  ChatroomPuzzleVariables,
} from 'graphql/Queries/generated/ChatroomPuzzle';

import { CHATMESSAGES_PER_PAGE } from './constants';

import { WatchObjectActionType } from 'components/Hoc/types';
import { StateType, ActionContentType } from 'reducers/types';
import {
  ChatRoomMessagesProps,
  ChatRoomMessagesBodyProps,
  ChatRoomMessagesDefaultProps,
} from './types';
import { CHATROOM_CHATMESSAGES_SUB } from 'graphql/Subscriptions/Chat';
import {
  ChatroomChatmessageSub,
  ChatroomChatmessageSubVariables,
} from 'graphql/Subscriptions/generated/ChatroomChatmessageSub';
import { useQuery, useApolloClient } from '@apollo/client';
import { Status } from 'generated/globalTypes';

// Add Wrapper to ChannelContent due to flex bug: https://github.com/philipwalton/flexbugs/issues/108
const ChannelContentWrapper = styled.div<{ autoExpand: boolean }>`
  display: block;
  width: 100%;
  ${p => p.autoExpand && 'height: 0;'}
  flex: 1 1 auto;
  flex-grow: 3;
  overflow-y: auto;
`;

const ChannelContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

let prevUpdateTime = new Date().getTime();

const ChatRoomMessagesBody = ({
  chatroomId,
  user,
  relatedPuzzleId,
  chatmessageUpdate,
  autoExpand,
}: ChatRoomMessagesBodyProps) => {
  const [hasMore, setHasMore] = useState(false);

  const client = useApolloClient();
  const { loading, error, data, fetchMore, subscribeToMore, refetch } =
    useQuery<ChatroomChatmessages, ChatroomChatmessagesVariables>(
      CHATROOM_CHATMESSAGES_QUERY,
      {
        variables: {
          chatroomId,
          limit: CHATMESSAGES_PER_PAGE,
        },
        onCompleted: ({ chatmessages }) => {
          if (chatmessages.length >= CHATMESSAGES_PER_PAGE) setHasMore(true);
          if (chatmessages.length > 0)
            chatmessageUpdate(chatroomId, chatmessages[0].id);
        },
      },
    );

  useEffect(
    () =>
      subscribeToMore<ChatroomChatmessageSub, ChatroomChatmessageSubVariables>({
        document: CHATROOM_CHATMESSAGES_SUB,
        variables: { chatroomId },
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: { subscriptionData: { data: ChatroomChatmessageSub } },
        ) => {
          const {
            data: { chatmessageSub },
          } = subscriptionData;
          if (!prev || !prev.chatmessages || !chatmessageSub) return prev;

          const newModified = new Date(chatmessageSub.data.modified).getTime();
          if (prevUpdateTime > newModified) return prev;

          const newMessageId = chatmessageSub.data.id;

          client
            .query<ChatroomChatmessages, ChatroomChatmessagesVariables>({
              query: CHATROOM_CHATMESSAGES_QUERY,
              variables: {
                chatroomId,
                since: new Date(prevUpdateTime).toISOString(),
              },
              fetchPolicy: 'network-only',
            })
            .then(({ data }) => {
              chatmessageUpdate(chatroomId, newMessageId);

              // Updates the original query
              const chatmessages = upsertMultipleItem(
                prev.chatmessages,
                data.chatmessages,
                'id',
                'desc',
              );
              client.writeQuery<ChatroomChatmessages>({
                query: CHATROOM_CHATMESSAGES_QUERY,
                variables: {
                  chatroomId,
                },
                data: {
                  chatmessages,
                },
              });

              // Update last updated time
              const maxModified = Math.max(
                ...chatmessages.map(({ modified }: { modified: string }) =>
                  new Date(modified).getTime(),
                ),
              );
              // take ceiling of update time as javascript crops nanoseconds
              prevUpdateTime =
                maxModified > 0 ? maxModified + 1 : new Date().getTime();
            });
          return prev;
        },
      }),
    [chatroomId],
  );

  if (error) {
    console.log(error);
    return <ErrorReload refetch={refetch} error={error} />;
  }
  if (!data) {
    if (loading) return <Loading centered />;
    return null;
  }
  const { chatmessages } = data;

  return (
    <KeepBottom
      watch={[
        {
          name: 'chatroomId',
          value: chatroomId,
          action: WatchObjectActionType.ToBottom,
        },
        {
          name: 'messageLength',
          value: chatmessages.length,
          action: WatchObjectActionType.StayOrBottom,
        },
        {
          name: 'loading',
          value: loading,
          action: WatchObjectActionType.ToBottom,
        },
        {
          name: 'userId',
          value: user.id,
          action: WatchObjectActionType.DoNothing,
        },
        {
          name: 'hasMore',
          value: hasMore,
          action: WatchObjectActionType.DoNothing,
        },
        {
          name: 'ChatRoomMessages',
          value: chatmessages,
          action: WatchObjectActionType.DoNothing,
          log: false,
        },
      ]}
    >
      {({ scrollerRef }) => (
        <ChannelContentWrapper autoExpand={autoExpand} ref={scrollerRef}>
          <ChannelContent>
            {relatedPuzzleId ? (
              <Query<ChatroomPuzzle, ChatroomPuzzleVariables>
                query={CHATROOM_PUZZLE_QUERY}
                variables={{
                  puzzleId: relatedPuzzleId,
                }}
              >
                {res => {
                  if (res.loading) return <Loading centered />;
                  if (res.error) return <div>Error</div>;
                  if (!res.data) return <div>No messages</div>;

                  const { puzzle: relatedPuzzle } = res.data;
                  if (!relatedPuzzle) return null;
                  if (
                    relatedPuzzle.anonymous &&
                    relatedPuzzle.status === Status.UNDERGOING
                  ) {
                    return (
                      <>
                        {chatmessages.map(cm => (
                          <Chatmessage
                            key={`chatmessage-${cm.id}`}
                            chatmessage={cm}
                            anonymous={relatedPuzzle.user.id === cm.user.id}
                          />
                        ))}
                      </>
                    );
                  }
                  return (
                    <>
                      {chatmessages.map(cm => (
                        <Chatmessage
                          key={`chatmessage-${cm.id}`}
                          chatmessage={cm}
                        />
                      ))}
                    </>
                  );
                }}
              </Query>
            ) : (
              chatmessages.map(cm => (
                <Chatmessage key={`chatmessage-${cm.id}`} chatmessage={cm} />
              ))
            )}
            {hasMore && (
              <LoadMoreVis
                wait={800}
                loadMore={() => {
                  fetchMore({
                    variables: {
                      offset: chatmessages.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        chatmessages: [
                          ...prev.chatmessages,
                          ...fetchMoreResult.chatmessages,
                        ],
                      });
                    },
                  })
                    .then(({ data }) => {
                      if (data.chatmessages.length < CHATMESSAGES_PER_PAGE)
                        setHasMore(false);
                    })
                    .catch(error => {
                      toast.error(`${error.name}: ${error.message}`);
                    });
                }}
              />
            )}
          </ChannelContent>
        </ChannelContentWrapper>
      )}
    </KeepBottom>
  );
};

const ChatRoomMessages = ({
  chatroomId,
  relatedPuzzleId,
  user,
  chatmessageUpdate,
  autoExpand,
}: ChatRoomMessagesProps) =>
  chatroomId ? (
    <ChatRoomMessagesBody
      autoExpand={autoExpand}
      chatroomId={chatroomId}
      relatedPuzzleId={relatedPuzzleId}
      user={user}
      chatmessageUpdate={chatmessageUpdate}
    />
  ) : (
    <Flex width={1} height={1} alignItems="center" justifyContent="center">
      <Box fontSize={2}>Chatroom does not exist!</Box>
    </Flex>
  );

ChatRoomMessages.defaultProps = ChatRoomMessagesDefaultProps;

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  chatmessageUpdate: (chatroomId: number, messagesHash: number) =>
    dispatch(chatReducer.actions.chatmessageUpdate(chatroomId, messagesHash)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ChatRoomMessages);
