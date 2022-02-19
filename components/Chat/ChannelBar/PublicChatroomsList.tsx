import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';

import { Query } from '@apollo/client/react/components';
import { PUBLIC_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { PublicChatroomsQuery } from 'graphql/Queries/generated/PublicChatroomsQuery';
import { ActionContentType } from 'reducers/types';
import { PublicChatroomsListProps } from './types';

const PublicChatroomsList = ({
  setChannel,
  setFalseChannelChangeModal,
}: PublicChatroomsListProps) => (
  <Query<PublicChatroomsQuery> query={PUBLIC_CHATROOMS_QUERY}>
    {({ loading, error, data }) => {
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (!data || !data.chatrooms) {
        if (loading) return <Loading centered />;
        return null;
      }
      return (
        <Flex flexWrap="wrap">
          <Box mt={2} width={1} borderBottom="3px solid" borderColor="orange.6">
            <FormattedMessage {...chatMessages.publicChatrooms} />
          </Box>
          {data.chatrooms.map(chatroom => (
            <Box
              key={chatroom.id}
              border="2px solid"
              borderColor="preset.channelbutton.ac"
              bg="preset.channelbutton.bg"
              color="preset.channelbutton.fg"
              borderRadius={2}
              m={1}
            >
              <ButtonTransparent
                height={24}
                onClick={() => {
                  setChannel(chatroom.name);
                  setFalseChannelChangeModal();
                }}
              >
                {chatroom.name}
              </ButtonTransparent>
            </Box>
          ))}
        </Flex>
      );
    }}
  </Query>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.channel.set(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(PublicChatroomsList);
