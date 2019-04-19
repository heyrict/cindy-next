import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

import ChannelBar from './ChannelBar';
import Chatmessage from './Chatmessage';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

const ChatroomChatmessagesQuery = gql`
  query ChatRoomChatmessages($chatroomName: String, $limit: Int) {
    sui_hei_chatmessage(
      where: { sui_hei_chatroom: { name: { _eq: $chatroomName } } }
      limit: $limit
      order_by: [{ id: desc }]
    ) {
      id
      content
      sui_hei_user {
        id
        nickname
        username
        sui_hei_current_useraward {
          id
          created
          sui_hei_award {
            id
            name
            description
          }
        }
      }
      created
    }
  }
`;

const ChatRoomPuzzleQuery = gql`
  query ChatRoomPuzzle($puzzleId: Int) {
    sui_hei_puzzle(where: { id: { _eq: $puzzleId } }, limit: 1) {
      id
      anonymous
      sui_hei_user {
        id
      }
    }
  }
`;

// Add Wrapper to ChannelContent due to flex bug: https://github.com/philipwalton/flexbugs/issues/108
const ChannelContentWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - ${p => p.theme.heights.channelbar});
`;

const ChannelContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const ChatRoom = ({ chatroom }) => {
  if (!chatroom) {
    return <div>Choose a chatroom</div>;
  }
  const puzzleChatMatch = PuzzleChatRegex.exec(chatroom);
  return (
    <div>
      <ChannelBar />
      <ChannelContentWrapper>
        <ChannelContent>
          <Subscribe to={[AuthContainer]}>
            {cont =>
              puzzleChatMatch ? (
                <Query
                  query={ChatroomChatmessagesQuery}
                  variables={{
                    chatroomName: chatroom,
                    limit: 10,
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error</div>;
                    if (!data) return <div>No messages</div>;
                    const { sui_hei_chatmessage: chatmessages } = data;

                    return (
                      <Query
                        query={ChatRoomPuzzleQuery}
                        variables={{
                          puzzleId: puzzleChatMatch[1],
                        }}
                      >
                        {res => {
                          if (res.loading) return <div>Loading...</div>;
                          if (res.error) return <div>Error</div>;
                          if (!res.data) return <div>No messages</div>;

                          const { sui_hei_puzzle: relatedPuzzle } = res.data;
                          return chatmessages.map(cm => (
                            <Chatmessage
                              key={`chatmessage-${cm.id}`}
                              chatmessage={cm}
                              anonymous={
                                relatedPuzzle[0].sui_hei_user.id ===
                                cm.sui_hei_user.id
                              }
                              orientation={
                                cont.state.user.id === cm.sui_hei_user.id
                                  ? 'right'
                                  : 'left'
                              }
                            />
                          ));
                        }}
                      </Query>
                    );
                  }}
                </Query>
              ) : (
                <Query
                  query={ChatroomChatmessagesQuery}
                  variables={{
                    chatroomName: chatroom,
                    limit: 10,
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error</div>;
                    if (!data) return <div>No messages</div>;
                    const { sui_hei_chatmessage: chatmessages } = data;

                    return chatmessages.map(cm => (
                      <Chatmessage
                        key={`chatmessage-${cm.id}`}
                        chatmessage={cm}
                        orientation={
                          cont.state.user.id === cm.sui_hei_user.id
                            ? 'right'
                            : 'left'
                        }
                      />
                    ));
                  }}
                </Query>
              )
            }
          </Subscribe>
        </ChannelContent>
      </ChannelContentWrapper>
    </div>
  );
};

ChatRoom.propTypes = {
  chatroom: PropTypes.string,
};

export default ChatRoom;
