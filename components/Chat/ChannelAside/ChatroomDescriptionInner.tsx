import React, { useState, useEffect } from 'react';
import { line2md } from 'common/markdown';

import { useMutation } from '@apollo/client';
import { UPDATE_CHATROOM_DESCRIPTION_MUTATION } from 'graphql/Mutations/Chat';

import { Box, Img, ButtonTransparent, Flex, Switch } from 'components/General';
import { SimpleLegacyEditor } from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';

import { useSelector } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import {
  UpdateChatroomDescriptionMutation,
  UpdateChatroomDescriptionMutationVariables,
} from 'graphql/Mutations/generated/UpdateChatroomDescriptionMutation';
import { ChatroomDescriptionInnerProps } from './types';

const ChatroomDescriptionInner = ({
  chatroom,
}: ChatroomDescriptionInnerProps) => {
  const [edit, setEdit] = useState(false);
  const [isPub, setPublic] = useState(chatroom.public);

  const userId = useSelector(
    state => globalReducer.rootSelector(state).user.id,
  );
  const [updateDescription] = useMutation<
    UpdateChatroomDescriptionMutation,
    UpdateChatroomDescriptionMutationVariables
  >(UPDATE_CHATROOM_DESCRIPTION_MUTATION);

  useEffect(() => {
    setEdit(false);
    setPublic(chatroom.public);
  }, [chatroom.id, chatroom.public]);

  return edit ? (
    <Box overflow="auto" flexGrow={1} bg="orange.2" color="orange.9" py={2}>
      <Flex>
        <Box width={2 / 5}>
          <FormattedMessage {...chatMessages.openToPublic} />
        </Box>
        <Box width={3 / 5}>
          <Switch onClick={() => setPublic(!isPub)} selected={isPub} />
        </Box>
      </Flex>
      <SimpleLegacyEditor
        initialValue={chatroom.description}
        onSubmit={description => {
          setEdit(false);
          if (
            description.trim() !== chatroom.description.trim() ||
            isPub !== chatroom.public
          ) {
            return updateDescription({
              variables: {
                chatroomId: chatroom.id,
                public: isPub,
                description,
              },
            });
          }
          return new Promise(resolve => resolve({}));
        }}
      />
    </Box>
  ) : (
    <Box
      overflow="auto"
      flexGrow={1}
      bg="solarized.white"
      color="solarized.black"
      py={2}
    >
      <Flex borderBottom="1px solid" borderColor="black">
        <Box width={2 / 5} m={2}>
          <FormattedMessage {...chatMessages.openToPublic} />
        </Box>
        <Box width={3 / 5} m={2}>
          {chatroom.public ? '○' : '×'}
        </Box>
      </Flex>
      <Box m={2}>
        {chatroom.description ? (
          <div
            style={{ minHeight: '3em' }}
            dangerouslySetInnerHTML={{
              __html: line2md(chatroom.description),
            }}
          />
        ) : (
          <p>
            <FormattedMessage {...chatMessages.noDescription} />
          </p>
        )}
        {userId === chatroom.user.id && (
          <ButtonTransparent onClick={() => setEdit(true)}>
            <Img src={pencilIcon} size="xxs" />
          </ButtonTransparent>
        )}
      </Box>
    </Box>
  );
};

export default ChatroomDescriptionInner;
