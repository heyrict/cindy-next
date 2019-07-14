import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { Query } from 'react-apollo';
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
        if (loading) return <span>Loading...</span>;
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (!data || !data.sui_hei_favoritechatroom) return null;
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
            {data.sui_hei_favoritechatroom.map(fc => (
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
                    setChannel(fc.sui_hei_chatroom.name);
                    setFalseChannelChangeModal();
                  }}
                >
                  {fc.sui_hei_chatroom.name}
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
    dispatch(globalReducer.actions.setChannel(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.setFalseChannelChangeModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(FavoriteChatroomsList);
