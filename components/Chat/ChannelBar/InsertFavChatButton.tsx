import React from 'react';
import { toast } from 'react-toastify';

import { ButtonTransparent, Img } from 'components/General';
import Tooltip from 'components/Hoc/Tooltip';
import starEmptyIcon from 'svgs/starEmpty.svg';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { Mutation } from '@apollo/react-components';
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
  chatroomName,
  compact,
}: InsertFavChatButtonProps) => (
  <Mutation<
    InsertFavoriteChatroomMutation,
    InsertFavoriteChatroomMutationVariables
  >
    mutation={INSERT_FAVORITE_CHATROOM_MUTATION}
    update={(proxy, { data, errors }) => {
      if (!data || !data.createFavchat) return;
      if (errors) {
        toast.error(JSON.stringify(errors));
        return;
      }
      const favchatrooms = proxy.readQuery<FavoriteChatroomsQuery>({
        query: FAVORITE_CHATROOMS_QUERY,
      });
      const newChatroom = data.createFavchat;
      if (!favchatrooms) return;
      favchatrooms.favchats.push(newChatroom);
      proxy.writeQuery({
        query: FAVORITE_CHATROOMS_QUERY,
        data: favchatrooms,
      });
    }}
  >
    {insertFavChat => {
      const _handleInsertFavChat = () => {
        insertFavChat({
          variables: {
            chatroomId,
          },
          optimisticResponse: {
            createFavchat: {
              __typename: 'Favchat',
              id: -1,
              chatroom: {
                __typename: 'Chatroom',
                id: chatroomId,
                name: chatroomName || '...',
              },
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
              onClick={_handleInsertFavChat}
            >
              <Img height="xxs" src={starEmptyIcon} alt="Star" />
              {!compact && (
                <FormattedMessage {...chatMessages.addToFavoriteChatrooms} />
              )}
            </ButtonTransparent>
          }
          tooltip={
            <FormattedMessage {...chatMessages.addToFavoriteChatrooms} />
          }
        />
      );
    }}
  </Mutation>
);

export default InsertFavChatButton;
