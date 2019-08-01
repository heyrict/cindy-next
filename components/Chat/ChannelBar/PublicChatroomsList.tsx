import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { Query } from 'react-apollo';
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
      if (loading) return <span>Loading...</span>;
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (!data || !data.sui_hei_chatroom) return null;
      return (
        <Flex flexWrap="wrap">
          <Box mt={2} width={1} borderBottom="3px solid" borderColor="orange.6">
            <FormattedMessage {...chatMessages.publicChatrooms} />
          </Box>
          {data.sui_hei_chatroom.map(chatroom => (
            <Box
              key={chatroom.id}
              border="2px solid"
              borderColor="yellow.6"
              bg="orange.2"
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

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(PublicChatroomsList);
