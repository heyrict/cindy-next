import React from 'react';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
import InsertFavChatButton from './InsertFavChatButton';
import DeleteFavChatButton from './DeleteFavChatButton';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Query } from '@apollo/react-components';
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
  if (!user.id) return null;
  return (
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
        const favchat = data.favchats.find(fc => fc.chatroom.id === chatroomId);
        return favchat === undefined ? (
          <InsertFavChatButton
            chatroomId={chatroomId}
            chatroomName={chatroomName}
            compact={compact}
          />
        ) : (
          <DeleteFavChatButton favchatId={favchat.id} compact={compact} />
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
