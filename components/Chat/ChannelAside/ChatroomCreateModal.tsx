import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';

import { useDispatch, useSelector } from 'react-redux';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_CHATROOM_MUTATION } from 'graphql/Mutations/Chat';

import Switch from 'components/General/Switch';
import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import Input from 'components/General/Input';
import ButtonTransparent from 'components/General/ButtonTransparent';
import { LegacyEditor } from 'components/PreviewEditor';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';

import {
  CreateChatroomMutation,
  CreateChatroomMutationVariables,
} from 'graphql/Mutations/generated/CreateChatroomMutation';

const ChatroomCreateModal = () => {
  const nameInputRef = useRef<HTMLInputElement>(null!);
  const descriptionInputRef = useRef<LegacyEditor>(null!);
  const [publicVal, setPublic] = useState(false);

  const chatroomCreateModal = useSelector(
    state => chatReducer.rootSelector(state).chatroomCreateModal,
  );
  const dispatch = useDispatch();
  const setFalseChatroomCreateModal = () =>
    dispatch(chatReducer.actions.chatroomCreateModal.setFalse());
  const setChannel = (channelName: string) =>
    dispatch(globalReducer.actions.channel.set(channelName));

  const [addChatroom] = useMutation<
    CreateChatroomMutation,
    CreateChatroomMutationVariables
  >(CREATE_CHATROOM_MUTATION);

  return (
    <Modal
      show={chatroomCreateModal}
      closefn={() => setFalseChatroomCreateModal()}
    >
      <ModalHeader>
        <FormattedMessage {...chatMessages.createChannel} />
        <ModalCloseBtn onClick={() => setFalseChatroomCreateModal()} />
      </ModalHeader>
      <ModalBody>
        <Flex flexWrap="wrap" alignItems="center">
          <Box width={1} mb={1}>
            <FormattedMessage {...chatMessages.chatroomName} />
          </Box>
          <Box width={1} mb={2}>
            <Input
              name="username"
              type="text"
              ref={nameInputRef}
              width={1}
              borderRadius={1}
            />
          </Box>
          <Box width={1} mb={1}>
            <FormattedMessage {...chatMessages.openToPublic} />
          </Box>
          <Box width={1} mb={2}>
            <Switch
              selected={publicVal}
              onClick={() => setPublic(!publicVal)}
            />
          </Box>
          <Box width={1} mb={1}>
            <FormattedMessage {...chatMessages.chatroomDescription} />
          </Box>
          <Box width={1} mb={2}>
            <LegacyEditor name="description" ref={descriptionInputRef} />
          </Box>
          <Box bg="orange.5" borderRadius="1" height={1} width={1}>
            <ButtonTransparent
              width={1}
              height={1}
              p={0}
              color="gray.1"
              fontWeight="bold"
              onClick={() => {
                const name = nameInputRef.current.value;
                const description = descriptionInputRef.current.getText();

                if (!name) {
                  toast.error('Chatroom name should not be blank!');
                  return;
                }

                addChatroom({
                  variables: {
                    name,
                    description,
                  },
                })
                  .then(() => {
                    toast.info(
                      <FormattedMessage
                        {...chatMessages.chatroomCreated}
                        values={{ name }}
                      />,
                    );
                    setFalseChatroomCreateModal();
                    setChannel(name);
                  })
                  .catch((error: ApolloError) => {
                    toast.error(error.message);
                  });
              }}
            >
              <FormattedMessage {...commonMessages.confirm} />
            </ButtonTransparent>
          </Box>
        </Flex>
      </ModalBody>
    </Modal>
  );
};

export default ChatroomCreateModal;
