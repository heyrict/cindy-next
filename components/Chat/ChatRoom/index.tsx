import React from 'react';

import { Query } from '@apollo/client/react/components';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';

import ErrorReload from 'components/General/ErrorReload';
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
import Loading from 'components/General/Loading';

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
        {({ data, error, loading, refetch }) => {
          let chatroomId = null;
          if (data && data.chatrooms && data.chatrooms[0]) {
            chatroomId = data.chatrooms[0].id;
          }
          if (error) {
            console.log(error);
            return <ErrorReload refetch={refetch} error={error} />;
          }
          return (
            <React.Fragment>
              <ChannelBar
                chatroomId={chatroomId}
                relatedPuzzleId={relatedPuzzleId}
              />
              {loading ? (
                <Loading />
              ) : chatroomId ? (
                <ChatRoomMessages
                  chatroomId={chatroomId}
                  relatedPuzzleId={relatedPuzzleId}
                  autoExpand
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
