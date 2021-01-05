import React from 'react';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
import InsertFavChatButton from './InsertFavChatButton';
import DeleteFavChatButton from './DeleteFavChatButton';
import { ButtonTransparent } from 'components/General';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Query } from '@apollo/client/react/components';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import { StateType } from 'reducers/types';
import { FavChatManipulateButtonProps } from './types';
import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';

const FavChatManipulateButton = ({
  user,
  chatroomId,
  chatroomName,
  compact,
}: FavChatManipulateButtonProps) => {
  const emptyButton = (
    <ButtonTransparent width={31} height="channelbar" />
  );

  if (!user.id) return emptyButton;

  return (
    <Query<FavoriteChatroomsQuery>
      query={FAVORITE_CHATROOMS_QUERY}
      variables={{
        userId: user.id,
      }}
    >
      {({ loading, error, data }) => {
        if (error) {
          toast.error(error.message);
          return emptyButton;
        }
        if (!data || !data.favchats) {
          return emptyButton;
        }
        const favchat = data.favchats.find(fc => fc.chatroom.id === chatroomId);
        return favchat === undefined ? (
          <InsertFavChatButton
            userId={user.id}
            chatroomId={chatroomId}
            chatroomName={chatroomName}
            compact={compact}
          />
        ) : (
          <DeleteFavChatButton userId={user.id} favchatId={favchat.id} compact={compact} />
        );
      }}
    </Query>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(FavChatManipulateButton);
