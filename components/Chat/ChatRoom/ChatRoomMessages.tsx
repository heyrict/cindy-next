import React, { useState, useEffect } from 'react';
import styled from 'theme/styled';
import KeepBottom from 'components/Hoc/KeepBottom';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import { Flex, Box } from 'components/General';
import { upsertItem } from 'common';

import { Query } from 'react-apollo';
import {
  CHATROOM_CHATMESSAGES_QUERY,
  CHATROOM_PUZZLE_QUERY,
} from 'graphql/Queries/Chat';
import { CHATROOM_CHATMESSAGES_SUBSCRIPTION } from 'graphql/Subscriptions/Chat';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import Chatmessage from '../Chatmessage';
import { StateType } from 'reducers/types';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';
import { ChatroomChatmessageSubscription } from 'graphql/Subscriptions/generated/ChatroomChatmessageSubscription';
import { ChatRoomMessagesProps, ChatRoomMessagesBodyProps } from './types';
import { WatchObjectActionType } from 'components/Hoc/types';
import {
  ChatroomPuzzle,
  ChatroomPuzzleVariables,
} from 'graphql/Queries/generated/ChatroomPuzzle';

// Add Wrapper to ChannelContent due to flex bug: https://github.com/philipwalton/flexbugs/issues/108
const ChannelContentWrapper = styled.div`
  overflow-y: auto;
  height: calc(
    100vh - ${p => p.theme.sizes.channelbar} - ${p => p.theme.sizes.chatinput}
  );
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
}: ChatRoomMessagesBodyProps) => {
  if (error) return <div>Error</div>;
  if (!data) return <div>No messages</div>;
  const { sui_hei_chatmessage: chatmessages } = data;

  if (!chatmessages) {
    return null;
  }

  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    if (chatmessages.length > 0) setHasMore(true);
  }, [chatroomId]);

  useEffect(
    () =>
      subscribeToMore({
        document: CHATROOM_CHATMESSAGES_SUBSCRIPTION,
        variables: { chatroomId },
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: { subscriptionData: { data: ChatroomChatmessageSubscription } },
        ) => {
          if (!subscriptionData.data) return prev;
          if (!subscriptionData.data.chatmessageSub) return prev;
          if (subscriptionData.data.chatmessageSub.eventType === 'INSERT') {
            return Object.assign({}, prev, {
              sui_hei_chatmessage: upsertItem(
                prev.sui_hei_chatmessage,
                subscriptionData.data.chatmessageSub.sui_hei_chatmessage,
                'id',
                'desc',
              ),
            });
          }
          return prev;
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
        <ChannelContentWrapper ref={scrollerRef}>
          <ChannelContent>
            {relatedPuzzleId ? (
              <Query<ChatroomPuzzle, ChatroomPuzzleVariables>
                query={CHATROOM_PUZZLE_QUERY}
                variables={{
                  puzzleId: relatedPuzzleId,
                }}
              >
                {res => {
                  if (res.loading) return <div>Loading...</div>;
                  if (res.error) return <div>Error</div>;
                  if (!res.data) return <div>No messages</div>;

                  const { sui_hei_puzzle_by_pk: relatedPuzzle } = res.data;
                  if (relatedPuzzle === null) return null;
                  if (relatedPuzzle.anonymous) {
                    return chatmessages.map(cm => (
                      <Chatmessage
                        key={`chatmessage-${cm.id}`}
                        chatmessage={cm}
                        anonymous={
                          relatedPuzzle.sui_hei_user.id === cm.sui_hei_user.id
                        }
                      />
                    ));
                  }
                  return chatmessages.map(cm => (
                    <Chatmessage
                      key={`chatmessage-${cm.id}`}
                      chatmessage={cm}
                    />
                  ));
                }}
              </Query>
            ) : (
              chatmessages.map(cm => (
                <Chatmessage key={`chatmessage-${cm.id}`} chatmessage={cm} />
              ))
            )}
            {loading && <div>Loading...</div>}
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
}: ChatRoomMessagesProps) =>
  chatroomId ? (
    <Query<ChatroomChatmessages, ChatroomChatmessagesVariables>
      query={CHATROOM_CHATMESSAGES_QUERY}
      variables={{
        chatroomId,
        limit: 10,
      }}
    >
      {queryParams => (
        <ChatRoomMessagesBody
          chatroomId={chatroomId}
          relatedPuzzleId={relatedPuzzleId}
          user={user}
          {...queryParams}
        />
      )}
    </Query>
  ) : (
    <Flex width={1} height={1} alignItems="center" justifyContent="center">
      <Box fontSize={2}>Chatroom does not exist!</Box>
    </Flex>
  );

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatRoomMessages);
