import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import KeepBottom from 'components/Hoc/KeepBottom';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import { Flex, Box } from 'components/General';
import { mergeList } from 'common';

import { Query, Mutation } from 'react-apollo';
import {
  ChatRoomChatmessagesQuery,
  ChatRoomPuzzleQuery,
} from 'graphql/Queries/Chat';
import { ChatRoomChatmessagesSubscription } from 'graphql/Subscriptions/Chat';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import Chatmessage from '../Chatmessage';

// Add Wrapper to ChannelContent due to flex bug: https://github.com/philipwalton/flexbugs/issues/108
const ChannelContentWrapper = styled.div`
  overflow-y: auto;
  height: calc(
    100vh - ${p => p.theme.heights.channelbar} -
      ${p => p.theme.heights.chatinput}
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
}) => {
  if (error) return <div>Error</div>;
  if (!data) return <div>No messages</div>;
  const { sui_hei_chatmessage: chatmessages } = data;

  if (!chatmessages) {
    return null;
  }

  useEffect(() => {
    subscribeToMore({
      document: ChatRoomChatmessagesSubscription,
      variables: { chatroomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          sui_hei_chatmessage: mergeList(
            prev.sui_hei_chatmessage,
            subscriptionData.data.sui_hei_chatmessage,
            'desc',
          ),
        });
      },
    });
  }, []);

  return (
    <KeepBottom
      watch={[
        {
          name: 'chatroomId',
          value: chatroomId,
          action: 'toBottom',
        },
        {
          name: 'messageLength',
          value: chatmessages.length,
          action: 'stayOrBottom',
        },
      ]}
    >
      {({ scrollerRef }) => (
        <ChannelContentWrapper ref={scrollerRef}>
          <ChannelContent>
            {relatedPuzzleId ? (
              <Query
                query={ChatRoomPuzzleQuery}
                variables={{
                  puzzleId: relatedPuzzleId,
                }}
              >
                {res => {
                  if (res.loading) return <div>Loading...</div>;
                  if (res.error) return <div>Error</div>;
                  if (!res.data) return <div>No messages</div>;

                  const { sui_hei_puzzle_by_pk: relatedPuzzle } = res.data;
                  if (relatedPuzzle.anonymous) {
                    return chatmessages.map(cm => (
                      <Chatmessage
                        key={`chatmessage-${cm.id}`}
                        chatmessage={cm}
                        anonymous={
                          relatedPuzzle.sui_hei_user.id === cm.sui_hei_user.id
                        }
                        orientation={
                          user.id === cm.sui_hei_user.id ? 'right' : 'left'
                        }
                      />
                    ));
                  }
                  return chatmessages.map(cm => (
                    <Chatmessage
                      key={`chatmessage-${cm.id}`}
                      chatmessage={cm}
                      orientation={
                        user.id === cm.sui_hei_user.id ? 'right' : 'left'
                      }
                    />
                  ));
                }}
              </Query>
            ) : (
              chatmessages.map(cm => (
                <Chatmessage
                  key={`chatmessage-${cm.id}`}
                  chatmessage={cm}
                  orientation={
                    user.id === cm.sui_hei_user.id ? 'right' : 'left'
                  }
                />
              ))
            )}
            {loading && <div>Loading...</div>}
            <LoadMoreVis
              loadMore={() => {
                fetchMore({
                  variables: {
                    offset: chatmessages.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (fetchMoreResult.sui_hei_chatmessage.length === 0)
                      loadMoreCont.hide();
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
          </ChannelContent>
        </ChannelContentWrapper>
      )}
    </KeepBottom>
  );
};

const ChatRoomMessages = ({ chatroomId, relatedPuzzleId, user }) =>
  chatroomId ? (
    <Query
      query={ChatRoomChatmessagesQuery}
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

ChatRoomMessages.propTypes = {
  chatroomId: PropTypes.number,
  relatedPuzzleId: PropTypes.number,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatRoomMessages);
