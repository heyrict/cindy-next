import React from 'react';
import Head from 'next/head';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { Query } from '@apollo/react-components';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';

import { compose } from 'redux';
import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Flex, Box, ButtonTransparent } from 'components/General';
import ChatRoomMessages from 'components/Chat/ChatRoom/ChatRoomMessages';
import ChatRoomInput from 'components/Chat/ChatRoom/ChatRoomInput';

import { ChannelPageProps } from 'pageTypes';
import {
  ChatroomId,
  ChatroomIdVariables,
} from 'graphql/Queries/generated/ChatroomId';
import { FormattedMessage, injectIntl } from 'react-intl';
import chatMessages from 'messages/components/chat';
import channelPageMessages from 'messages/pages/channel';

import { ActionContentType } from 'reducers/types';

const PuzzleChatRegex = /^puzzle-(\d+)$/;

const ChannelContentBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  left: ${p => p.theme.sizes.chatXL};
  top: ${p => p.theme.sizes.toolbar};
  right: 0;
  bottom: 0;
  ${p => p.theme.mediaQueries.large} {
    left: ${p => p.theme.sizes.chatLG};
  }
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
  }
`;

const OpenAsideButton = styled(ButtonTransparent)`
  min-width: 6em;
  max-width: 10pm;
  display: none;
  ${p => p.theme.mediaQueries.medium} {
    display: inline-box;
  }
`;

class ChannelPage extends React.Component<ChannelPageProps> {
  static async getInitialProps({ query }: { query: { name: string } }) {
    return { chatroom: query && query.name };
  }

  render() {
    const _ = this.props.intl.formatMessage;
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
            if (data && data.chatrooms && data.chatrooms[0]) {
              chatroomId = data.chatrooms[0].id;
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
                <Flex overflow="auto" flexWrap="nowrap" flexDirection="column">
                  <Box width={1} height="channelbar">
                    <Flex
                      bg="orange.2"
                      borderBottom="1px solid"
                      borderColor="orange.3"
                    >
                      <OpenAsideButton
                        color="orange.6"
                        height="channelbar"
                        mr="auto"
                        onClick={() => this.props.toggleAside()}
                      >
                        <FormattedMessage {...chatMessages.channels} /> &gt;&gt;
                      </OpenAsideButton>
                    </Flex>
                  </Box>
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
                </Flex>
              </React.Fragment>
            );
          }}
        </Query>
      </ChannelContentBox>
    );
  }
}

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleAside: () => dispatch(globalReducer.actions.aside.toggle()),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withRedux,
)(ChannelPage);
