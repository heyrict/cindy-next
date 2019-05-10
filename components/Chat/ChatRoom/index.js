import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { ChatRoomIdQuery } from 'graphql/Queries/Chat';

import ChannelBar from '../ChannelBar';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomInput from './ChatRoomInput';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

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
            <React.Fragment>
              <ChannelBar chatroomId={chatroomId} />
              <ChatRoomMessages
                chatroomId={chatroomId}
                relatedPuzzleId={relatedPuzzleId}
              />
              {chatroomId && <ChatRoomInput chatroomId={chatroomId} />}
            </React.Fragment>
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
