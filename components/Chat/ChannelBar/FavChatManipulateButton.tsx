import React from 'react';
import { toast } from 'react-toastify';

import InsertFavChatButton from './InsertFavChatButton';
import DeleteFavChatButton from './DeleteFavChatButton';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Query } from 'react-apollo';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import { StateType } from 'reducers/types';
import { FavChatManipulateButtonProps } from './types';
import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';

const FavChatManipulateButton = ({
  user,
  chatroomId,
  chatroomName,
}: FavChatManipulateButtonProps) => {
  if (!user.id) return null;
  return (
    <Query<FavoriteChatroomsQuery> query={FAVORITE_CHATROOMS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <span>Loading...</span>;
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (!data || !data.sui_hei_favoritechatroom) return null;
        const favchat = data.sui_hei_favoritechatroom.find(
          fc => fc.sui_hei_chatroom.id === chatroomId,
        );
        return favchat === undefined ? (
          <InsertFavChatButton
            chatroomId={chatroomId}
            chatroomName={chatroomName}
          />
        ) : (
          <DeleteFavChatButton favchatId={favchat.id} />
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
