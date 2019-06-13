import React from 'react';

import { Query } from 'react-apollo';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';

import ChannelBar from '../ChannelBar';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomInput from './ChatRoomInput';

import { ChatRoomProps } from './types';
import {
  ChatroomId,
  ChatroomIdVariables,
} from 'graphql/Queries/generated/ChatroomId';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

class ChatRoom extends React.Component<ChatRoomProps> {
  render() {
    const { chatroom } = this.props;
    if (!chatroom) {
      return <div>Choose a chatroom</div>;
    }
    const puzzleChatMatch = PuzzleChatRegex.exec(chatroom);
    const relatedPuzzleId = puzzleChatMatch && parseInt(puzzleChatMatch[1], 10);
    return (
      <Query<ChatroomId, ChatroomIdVariables>
        query={CHATROOM_ID_QUERY}
        variables={{
          chatroomName: chatroom,
        }}
      >
        {({ data }) => {
          let chatroomId = null;
          if (data && data.sui_hei_chatroom && data.sui_hei_chatroom[0]) {
            chatroomId = data.sui_hei_chatroom[0].id;
          } else {
            return null;
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

export default ChatRoom;
