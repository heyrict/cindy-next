import React from 'react';
import { toast } from 'react-toastify';

import { ButtonTransparent, Img } from 'components/General';
import Tooltip from 'components/Hoc/Tooltip';
import starEmptyIcon from 'svgs/starEmpty.svg';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { useMutation } from '@apollo/client';
import { INSERT_FAVORITE_CHATROOM_MUTATION } from 'graphql/Mutations/Chat';

import {
  InsertFavoriteChatroomMutation,
  InsertFavoriteChatroomMutationVariables,
} from 'graphql/Mutations/generated/InsertFavoriteChatroomMutation';
import { InsertFavChatButtonProps } from './types';
import { FAVORITE_CHATROOMS_QUERY } from 'graphql/Queries/Chat';
import { FavoriteChatroomsQuery } from 'graphql/Queries/generated/FavoriteChatroomsQuery';

const InsertFavChatButton = ({
  chatroomId,
  userId,
  compact,
}: InsertFavChatButtonProps) => {
  const [insertFavChat] = useMutation<
    InsertFavoriteChatroomMutation,
    InsertFavoriteChatroomMutationVariables
  >(INSERT_FAVORITE_CHATROOM_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createFavchat) return;
      const favchatrooms = proxy.readQuery<FavoriteChatroomsQuery>({
        query: FAVORITE_CHATROOMS_QUERY,
        variables: {
          userId,
        },
      });
      const newChatroom = data.createFavchat;
      if (!favchatrooms) return;
      proxy.writeQuery({
        query: FAVORITE_CHATROOMS_QUERY,
        variables: {
          userId,
        },
        data: {
          favchats: [...favchatrooms.favchats, newChatroom],
        },
      });
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
    },
  });

  const _handleInsertFavChat = () => {
    insertFavChat({
      variables: {
        chatroomId,
      },
    });
  };

  return (
    <Tooltip
      reference={
        <ButtonTransparent
          px={2}
          height="channelbar"
          onClick={_handleInsertFavChat}
        >
          <Img height="xxs" src={starEmptyIcon} alt="Star" />
          {!compact && (
            <FormattedMessage {...chatMessages.addToFavoriteChatrooms} />
          )}
        </ButtonTransparent>
      }
      tooltip={<FormattedMessage {...chatMessages.addToFavoriteChatrooms} />}
    />
  );
};

export default InsertFavChatButton;
