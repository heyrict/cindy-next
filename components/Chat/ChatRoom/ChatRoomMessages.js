import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'components/General';

import { Query, Mutation } from 'react-apollo';
import {
  ChatRoomChatmessagesQuery,
  ChatRoomPuzzleQuery,
} from 'graphql/Queries/Chat';

import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

import Chatmessage from '../Chatmessage';

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

            return relatedPuzzleId ? (
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

                  const { sui_hei_puzzle: relatedPuzzle } = res.data;
                  return chatmessages.map(cm => (
                    <Chatmessage
                      key={`chatmessage-${cm.id}`}
                      chatmessage={cm}
                      anonymous={
                        relatedPuzzle[0].sui_hei_user.id === cm.sui_hei_user.id
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
            ) : (
              chatmessages.map(cm => (
                <Chatmessage
                  key={`chatmessage-${cm.id}`}
                  chatmessage={cm}
                  orientation={
                    cont.state.user.id === cm.sui_hei_user.id ? 'right' : 'left'
                  }
                />
              ))
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
