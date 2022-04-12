import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';

import { Query } from '@apollo/client/react/components';
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
  header,
  linkChange,
}: FavoriteChatroomsListProps) => {
  const router = useRouter();

  return user.id ? (
    <Query<FavoriteChatroomsQuery>
      query={FAVORITE_CHATROOMS_QUERY}
      variables={{
        userId: user.id,
      }}
    >
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
            {header ? (
              header(<FormattedMessage {...chatMessages.favoriteChatrooms} />)
            ) : (
              <Box
                mt={2}
                width={1}
                borderBottom="3px solid"
                borderColor="orange.6"
              >
                <FormattedMessage {...chatMessages.favoriteChatrooms} />
              </Box>
            )}
            {data.favchats.map(fc => (
              <Box
                key={fc.id}
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
                    if (linkChange) {
                      router.push(
                        '/channel/[name]',
                        `/channel/${fc.chatroom.name}`,
                      );
                    } else {
                      setChannel(fc.chatroom.name);
                      setFalseChannelChangeModal();
                    }
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
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.channel.set(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(FavoriteChatroomsList);
