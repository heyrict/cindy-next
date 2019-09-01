import React from 'react';
import Head from 'next/head';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { Query } from 'react-apollo';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';

import ChatRoomMessages from 'components/Chat/ChatRoom/ChatRoomMessages';
import ChatRoomInput from 'components/Chat/ChatRoom/ChatRoomInput';

import { ChannelPageProps } from 'pageTypes';
import {
  ChatroomId,
  ChatroomIdVariables,
} from 'graphql/Queries/generated/ChatroomId';
import { FormattedMessage, intlShape } from 'react-intl';
import chatMessages from 'messages/components/chat';
import channelPageMessages from 'messages/pages/channel';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

const ChannelContentBox = styled.div`
  position: absolute;
  left: ${p => p.theme.sizes.chatXL};
  top: ${p => p.theme.sizes.toolbar};
  right: 0;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: auto;
  ${p => p.theme.mediaQueries.large} {
    left: ${p => p.theme.sizes.chatLG};
  }
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
  }
`;

class ChannelPage extends React.Component<ChannelPageProps> {
  static contextTypes = {
    intl: intlShape,
  };

  static async getInitialProps({ query }: { query: { name: string } }) {
    return { chatroom: query && query.name };
  }

  render() {
    const _ = this.context.intl.formatMessage;
    const { chatroom } = this.props;
    if (!chatroom) {
      return <div>Choose a chatroom</div>;
    }
    const puzzleChatMatch = PuzzleChatRegex.exec(chatroom);
    const relatedPuzzleId = puzzleChatMatch && parseInt(puzzleChatMatch[1], 10);
    return (
      <ChannelContentBox>
        <Query<ChatroomId, ChatroomIdVariables>
          query={CHATROOM_ID_QUERY}
          variables={{
            chatroomName: chatroom,
          }}
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
                <Head>
                  <title>
                    {_(channelPageMessages.title, { name: chatroom })} | Cindy
                  </title>
                  <meta
                    name="description"
                    content={_(channelPageMessages.description)}
                  />
                </Head>
                {chatroomId ? (
                  <ChatRoomMessages
                    chatroomId={chatroomId}
                    relatedPuzzleId={relatedPuzzleId}
                  />
                ) : (
                  <h1 style={{ margin: '1em' }}>
                    <FormattedMessage {...chatMessages.notExistDescription} />
                  </h1>
                )}
                {chatroomId && <ChatRoomInput chatroomId={chatroomId} />}
              </React.Fragment>
            );
          }}
        </Query>
      </ChannelContentBox>
    );
  }
}

export default ChannelPage;
