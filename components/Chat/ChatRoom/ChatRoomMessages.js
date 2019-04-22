import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import KeepBottom from 'components/KeepBottom';
import { Flex, Box } from 'components/General';

import { Query, Mutation } from 'react-apollo';
import {
  ChatRoomChatmessagesQuery,
  ChatRoomPuzzleQuery,
} from 'graphql/Queries/Chat';

import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

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

const ChatRoomMessages = ({ chatroomId, relatedPuzzleId }) =>
  chatroomId ? (
    <Subscribe to={[AuthContainer]}>
      {cont => (
        <Query
          query={ChatRoomChatmessagesQuery}
          variables={{
            chatroomId,
            limit: 10,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            if (!data) return <div>No messages</div>;
            const { sui_hei_chatmessage: chatmessages } = data;

            return (
              <KeepBottom watch={[chatroomId]}>
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

                            const {
                              sui_hei_puzzle_by_pk: relatedPuzzle,
                            } = res.data;
                            if (relatedPuzzle.anonymous) {
                              return chatmessages.map(cm => (
                                <Chatmessage
                                  key={`chatmessage-${cm.id}`}
                                  chatmessage={cm}
                                  anonymous={
                                    relatedPuzzle.sui_hei_user.id ===
                                    cm.sui_hei_user.id
                                  }
                                  orientation={
                                    cont.state.user.id === cm.sui_hei_user.id
                                      ? 'right'
                                      : 'left'
                                  }
                                />
                              ));
                            }
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
                      ) : (
                        chatmessages.map(cm => (
                          <Chatmessage
                            key={`chatmessage-${cm.id}`}
                            chatmessage={cm}
                            orientation={
                              cont.state.user.id === cm.sui_hei_user.id
                                ? 'right'
                                : 'left'
                            }
                          />
                        ))
                      )}
                    </ChannelContent>
                  </ChannelContentWrapper>
                )}
              </KeepBottom>
            );
          }}
        </Query>
      )}
    </Subscribe>
  ) : (
    <Flex width={1} height={1} alignItems="center" justifyContent="center">
      <Box fontSize={2}>Chatroom does not exist!</Box>
    </Flex>
  );

ChatRoomMessages.propTypes = {
  chatroomId: PropTypes.number,
  relatedPuzzleId: PropTypes.number,
};

export default ChatRoomMessages;
