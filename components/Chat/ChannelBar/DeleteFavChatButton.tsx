import React from 'react';
import { toast } from 'react-toastify';

import { ButtonTransparent, Img } from 'components/General';
import Tooltip from 'components/Hoc/Tooltip';
import starFillIcon from 'svgs/starFill.svg';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { useMutation } from '@apollo/client';
import { DELETE_FAVORITE_CHATROOM_MUTATION } from 'graphql/Mutations/Chat';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import {
  DeleteFavoriteChatroomMutation,
  DeleteFavoriteChatroomMutationVariables,
} from 'graphql/Mutations/generated/DeleteFavoriteChatroomMutation';
import { DeleteFavChatButtonProps } from './types';
import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';

const DeleteFavChatButton = ({
  favchatId,
  userId,
  compact,
}: DeleteFavChatButtonProps) => {
  const [deleteFavChat] = useMutation<
    DeleteFavoriteChatroomMutation,
    DeleteFavoriteChatroomMutationVariables
  >(DELETE_FAVORITE_CHATROOM_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.deleteFavchat) return;
      const favchats = proxy.readQuery<FavoriteChatroomsQuery>({
        query: FAVORITE_CHATROOMS_QUERY,
        variables: {
          userId,
        },
      });
      if (!favchats) return;
      proxy.writeQuery({
        query: FAVORITE_CHATROOMS_QUERY,
        variables: {
          userId,
        },
        data: {
          ...favchats,
          favchats: favchats.favchats.filter(fc => fc.id !== favchatId),
        },
      });
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
    },
  });

  const _handleDeleteFavChat = () => {
    deleteFavChat({
      variables: {
        favchatId: favchatId,
      },
      optimisticResponse: {
        deleteFavchat: {
          __typename: 'Favchat',
          id: favchatId,
        },
      },
    });
  };

  return (
    <Tooltip
      reference={
        <ButtonTransparent
          px={2}
          height="channelbar"
          onClick={_handleDeleteFavChat}
        >
          <Img height="xxs" src={starFillIcon} alt="Star" />
          {!compact && (
            <FormattedMessage {...chatMessages.deleteFromFavoriteChatrooms} />
          )}
        </ButtonTransparent>
      }
      tooltip={
        <FormattedMessage {...chatMessages.deleteFromFavoriteChatrooms} />
      }
    />
  );
};

export default DeleteFavChatButton;
