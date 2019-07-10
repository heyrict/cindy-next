import React from 'react';
import { toast } from 'react-toastify';

import { ButtonTransparent, Img } from 'components/General';
import starFillIcon from 'svgs/starEmpty.svg';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { Mutation } from 'react-apollo';
import { DELETE_FAVORITE_CHATROOM_MUTATION } from 'graphql/Mutations/Chat';
import {
  DeleteFavoriteChatroomMutation,
  DeleteFavoriteChatroomMutationVariables,
} from 'graphql/Mutations/generated/DeleteFavoriteChatroomMutation';
import { DeleteFavChatButtonProps } from './types';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';
import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';

const DeleteFavChatButton = ({ favchatId }: DeleteFavChatButtonProps) => (
  <Mutation<
    DeleteFavoriteChatroomMutation,
    DeleteFavoriteChatroomMutationVariables
  >
    mutation={DELETE_FAVORITE_CHATROOM_MUTATION}
    update={(proxy, { data, errors }) => {
      if (!data || !data.delete_sui_hei_favoritechatroom) return;
      if (data.delete_sui_hei_favoritechatroom.affected_rows === 0) return;
      if (errors) {
        toast.error(JSON.stringify(errors));
        return;
      }
      const favChatrooms = proxy.readQuery<FavoriteChatroomsQuery>({
        query: FAVORITE_CHATROOMS_QUERY,
      });
      if (!favChatrooms) return;
      proxy.writeQuery({
        query: FAVORITE_CHATROOMS_QUERY,
        data: {
          ...favChatrooms,
          sui_hei_favoritechatroom: favChatrooms.sui_hei_favoritechatroom.filter(
            fc => fc.id !== favchatId,
          ),
        },
      });
    }}
  >
    {deleteFavChat => (
      <ButtonTransparent
        borderRadius={2}
        border="3px solid"
        borderColor="orange.6"
        p={2}
        onClick={() => {
          deleteFavChat({
            variables: {
              favoriteChatroomId: favchatId,
            },
            optimisticResponse: {
              delete_sui_hei_favoritechatroom: {
                __typename: 'sui_hei_favoritechatroom_mutation_response',
                affected_rows: 1,
              },
            },
          });
        }}
      >
        <Img height="xxs" mx={2} src={starFillIcon} alt="Star" />
        <FormattedMessage {...chatMessages.deleteFromFavoriteChatrooms} />
      </ButtonTransparent>
    )}
  </Mutation>
);

export default DeleteFavChatButton;
