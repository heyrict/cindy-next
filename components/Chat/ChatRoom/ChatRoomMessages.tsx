import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';
import { upsertItem } from 'common/update';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import KeepBottom from 'components/Hoc/KeepBottom';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';

import { Query } from '@apollo/react-components';
import {
  CHATROOM_CHATMESSAGES_QUERY,
  CHATROOM_PUZZLE_QUERY,
} from 'graphql/Queries/Chat';
import { CHATROOM_CHATMESSAGES_LIVE_QUERY } from 'graphql/LiveQueries/Chat';

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
import { ChatroomChatmessageLiveQuery } from 'graphql/LiveQueries/generated/ChatroomChatmessageLiveQuery';
import { StateType, ActionContentType } from 'reducers/types';
import {
  ChatRoomMessagesProps,
  ChatRoomMessagesBodyProps,
  ChatRoomMessagesDefaultProps,
} from './types';

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

const ChatRoomMessagesBody = ({
  loading,
  error,
  data,
  fetchMore,
  subscribeToMore,
  chatroomId,
  user,
  relatedPuzzleId,
  chatmessageUpdate,
  autoExpand,
}: ChatRoomMessagesBodyProps) => {
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.sui_hei_chatmessage) {
    if (loading) return <Loading centered />;
    return null;
  }
  const { sui_hei_chatmessage: chatmessages } = data;

  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    if (loading) return;
    if (chatmessages.length >= CHATMESSAGES_PER_PAGE) setHasMore(true);
    if (chatmessages.length > 0)
      chatmessageUpdate(chatroomId, chatmessages[chatmessages.length - 1].id);
  }, [chatroomId, loading]);

  useEffect(
    () =>
      subscribeToMore({
        document: CHATROOM_CHATMESSAGES_LIVE_QUERY,
        variables: { chatroomId },
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: { subscriptionData: { data: ChatroomChatmessageLiveQuery } },
        ) => {
          if (prev === undefined) return prev;
          if (
            !subscriptionData.data ||
            !subscriptionData.data.sui_hei_chatmessage
          )
            return prev;
          if (subscriptionData.data.sui_hei_chatmessage.length === 0)
            return prev;
          chatmessageUpdate(
            chatroomId,
            subscriptionData.data.sui_hei_chatmessage[
              subscriptionData.data.sui_hei_chatmessage.length - 1
            ].id,
          );
          return Object.assign({}, prev, {
            sui_hei_chatmessage: upsertItem(
              prev.sui_hei_chatmessage,
              subscriptionData.data.sui_hei_chatmessage[0],
              'id',
              'desc',
            ),
          });
        },
      }),
    [chatroomId],
  );

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

                  const { sui_hei_puzzle_by_pk: relatedPuzzle } = res.data;
                  if (!relatedPuzzle) return null;
                  if (relatedPuzzle.anonymous && relatedPuzzle.status === 0) {
                    return (
                      <>
                        {chatmessages.map(cm => (
                          <Chatmessage
                            key={`chatmessage-${cm.id}`}
                            chatmessage={cm}
                            anonymous={
                              relatedPuzzle.sui_hei_user.id ===
                              cm.sui_hei_user.id
                            }
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
                loadMore={() => {
                  fetchMore({
                    variables: {
                      offset: chatmessages.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      if (fetchMoreResult.sui_hei_chatmessage.length === 0)
                        setHasMore(false);
                      return Object.assign({}, prev, {
                        sui_hei_chatmessage: [
                          ...prev.sui_hei_chatmessage,
                          ...fetchMoreResult.sui_hei_chatmessage,
                        ],
                      });
                    },
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
    <Query<ChatroomChatmessages, ChatroomChatmessagesVariables>
      query={CHATROOM_CHATMESSAGES_QUERY}
      variables={{
        chatroomId,
        limit: CHATMESSAGES_PER_PAGE,
      }}
    >
      {queryParams => (
        <ChatRoomMessagesBody
          autoExpand={autoExpand}
          chatroomId={chatroomId}
          relatedPuzzleId={relatedPuzzleId}
          user={user}
          chatmessageUpdate={chatmessageUpdate}
          {...queryParams}
        />
      )}
    </Query>
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

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatRoomMessages);
