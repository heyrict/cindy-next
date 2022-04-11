import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { line2md } from 'common/markdown';

import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'messages/pages/channels';
import chatMessages from 'messages/components/chat';

import { useSelector } from 'react-redux';
import * as globalReducer from 'reducers/global';

import {
  Box,
  ButtonTransparent,
  Flex,
  Heading,
  Panel,
} from 'components/General';
import Chatmessage from 'components/Chat/Chatmessage';
import Loading from 'components/General/Loading';
import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import FavChatManipulateButton from 'components/Chat/ChannelBar/FavChatManipulateButton';
import UserInline from 'components/User/UserInline';
import FavoriteChatroomsList from 'components/Chat/ChannelBar/FavoriteChatroomsList';
import OfficialChatroomsList from 'components/Chat/ChannelBar/OfficialChatroomsList';

import { useQuery } from '@apollo/client';
import {
  PUBLIC_CHATROOMS_QUERY,
  RECENT_CHATMESSAGES_QUERY,
} from 'graphql/Queries/Chat';

import {
  RecentChatsQuery,
  RecentChatsQueryVariables,
} from 'graphql/Queries/generated/RecentChatsQuery';
import {
  PublicChatroomsQuery,
  PublicChatroomsQueryVariables,
} from 'graphql/Queries/generated/PublicChatroomsQuery';
import { StateType } from 'reducers/types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const ChannelsPage = () => {
  const { formatMessage: _ } = useIntl();
  const userId = useSelector(
    (state: StateType) => globalReducer.rootSelector(state).user.id,
  )!;

  return (
    <>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Flex flexWrap="wrap">
        <Box width={[1, 3 / 8, 1, 3 / 8, 1 / 3]}>
          <Heading fontSize={4}>
            <FormattedMessage {...messages.recentChats} />
          </Heading>
          <RecentChatsRenderer userId={userId} />
        </Box>
        <Box width={[1, 5 / 8, 1, 5 / 8, 2 / 3]}>
          <OfficialChatroomsList
            header={msg => (
              <Heading style={{ width: '100%' }} fontSize={4}>
                {msg}
              </Heading>
            )}
          />
          <FavoriteChatroomsList
            header={msg => (
              <Heading style={{ width: '100%' }} fontSize={4}>
                {msg}
              </Heading>
            )}
          />
          <Heading fontSize={4}>
            <FormattedMessage {...messages.publicChannels} />
          </Heading>
          <PublicChatroomsRenderer />
        </Box>
      </Flex>
    </>
  );
};

const RecentChatsRenderer = ({ userId }: { userId: number }) => {
  const { loading, error, data } = useQuery<
    RecentChatsQuery,
    RecentChatsQueryVariables
  >(RECENT_CHATMESSAGES_QUERY, {
    variables: {
      userId,
      limit: 20,
      offset: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && (!data || !data.recentChatmessages)) return <Loading />;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data && data.recentChatmessages) {
    return (
      <React.Fragment>
        {data.recentChatmessages.map(chatmessage => (
          <Chatmessage
            key={`chatmessage-${chatmessage.id}`}
            chatmessage={chatmessage}
            chatroom={chatmessage.chatroom}
          />
        ))}
      </React.Fragment>
    );
  }
  return null;
};

const PublicChatroomsRenderer = () => {
  return (
    <React.Fragment>
      <PaginatedQuery<PublicChatroomsQuery, PublicChatroomsQueryVariables>
        query={PUBLIC_CHATROOMS_QUERY}
        getItemCount={data => data.chatroomCount}
        renderItems={data => {
          if (!data.chatrooms) return null;
          return (
            <>
              {data.chatrooms.map(chatroom => (
                <Panel
                  key={chatroom.id}
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Flex>
                    <Box fontSize={2} fontWeight="bold">
                      <Link
                        href="/channel/[name]"
                        as={`/channel/${chatroom.name}`}
                        passHref
                      >
                        <ButtonTransparentA p={1}>
                          {chatroom.name}
                        </ButtonTransparentA>
                      </Link>
                    </Box>
                    <Box mx={2} py={1}>
                      by
                    </Box>
                    <UserInline user={chatroom.user} />
                    <Box ml="auto">
                      <FavChatManipulateButton chatroomId={chatroom.id} />
                    </Box>
                  </Flex>
                  <hr />
                  {chatroom.description ? (
                    <Box
                      style={{ minHeight: '3em' }}
                      mb={4}
                      dangerouslySetInnerHTML={{
                        __html: line2md(chatroom.description),
                      }}
                    />
                  ) : (
                    <Box mb={4}>
                      <FormattedMessage {...chatMessages.noDescription} />
                    </Box>
                  )}
                </Panel>
              ))}
            </>
          );
        }}
      />
    </React.Fragment>
  );
};

export default ChannelsPage;
