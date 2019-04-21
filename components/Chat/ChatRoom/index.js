import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Query } from 'react-apollo';
import { ChatRoomIdQuery } from 'graphql/Queries/Chat';

import ChannelBar from '../ChannelBar';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomInput from './ChatRoomInput';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

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

class ChatRoom extends React.Component {
  render() {
    const { chatroom } = this.props;
    if (!chatroom) {
      return <div>Choose a chatroom</div>;
    }
    const puzzleChatMatch = PuzzleChatRegex.exec(chatroom);
    const relatedPuzzleId = puzzleChatMatch && parseInt(puzzleChatMatch[1], 10);
    return (
      <Query
        query={ChatRoomIdQuery}
        variables={{
          chatroomName: chatroom,
        }}
      >
        {({ data }) => {
          let chatroomId = null;
          if (data && data.sui_hei_chatroom[0]) {
            chatroomId = data.sui_hei_chatroom[0].id;
          }
          return (
            <div>
              <ChannelBar chatroomId={chatroomId} />
              <ChannelContentWrapper>
                <ChannelContent>
                  <ChatRoomMessages
                    chatroomId={chatroomId}
                    relatedPuzzleId={relatedPuzzleId}
                  />
                </ChannelContent>
              </ChannelContentWrapper>
              {chatroomId && <ChatRoomInput chatroomId={chatroomId} />}
            </div>
          );
        }}
      </Query>
    );
  }
}

ChatRoom.propTypes = {
  chatroom: PropTypes.string,
};

export default ChatRoom;
