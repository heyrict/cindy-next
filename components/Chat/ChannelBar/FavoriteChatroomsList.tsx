import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';

import { Query } from '@apollo/react-components';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';
import { StateType, ActionContentType } from 'reducers/types';
import { FavoriteChatroomsListProps } from './types';

const FavoriteChatroomsList = ({
  user,
  setChannel,
  setFalseChannelChangeModal,
}: FavoriteChatroomsListProps) =>
  user.id ? (
    <Query<FavoriteChatroomsQuery> query={FAVORITE_CHATROOMS_QUERY}>
      {({ loading, error, data }) => {
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (!data || !data.favchats) {
          if (loading) return <Loading centered />;
          return null;
        }
        return (
          <Flex flexWrap="wrap">
            <Box
              mt={2}
              width={1}
              borderBottom="3px solid"
              borderColor="orange.6"
            >
              <FormattedMessage {...chatMessages.favoriteChatrooms} />
            </Box>
            {data.favchats.map(fc => (
              <Box
                key={fc.id}
                border="2px solid"
                borderColor="yellow.6"
                bg="orange.2"
                borderRadius={2}
                m={1}
              >
                <ButtonTransparent
                  height={24}
                  onClick={() => {
                    setChannel(fc.chatroom.name);
                    setFalseChannelChangeModal();
                  }}
                >
                  {fc.chatroom.name}
                </ButtonTransparent>
              </Box>
            ))}
          </Flex>
        );
      }}
    </Query>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.channel.set(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(FavoriteChatroomsList);
