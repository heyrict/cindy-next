import React from 'react';
import { toast } from 'react-toastify';

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
import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/chat';

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
        fetchPolicy="cache-first"
      >
        {({ data, error }) => {
          let chatroomId = null;
          if (data && data.sui_hei_chatroom && data.sui_hei_chatroom[0]) {
            chatroomId = data.sui_hei_chatroom[0].id;
          }
          if (error) {
            toast.error(error.message);
          }
          return (
            <React.Fragment>
              <ChannelBar
                chatroomId={chatroomId}
                relatedPuzzleId={relatedPuzzleId}
              />
              {chatroomId ? (
                <ChatRoomMessages
                  chatroomId={chatroomId}
                  relatedPuzzleId={relatedPuzzleId}
                />
              ) : (
                <h1 style={{ margin: '1em' }}>
                  <FormattedMessage {...messages.notExistDescription} />
                </h1>
              )}
              {chatroomId && <ChatRoomInput chatroomId={chatroomId} />}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default ChatRoom;
