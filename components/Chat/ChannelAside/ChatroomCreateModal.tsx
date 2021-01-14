import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';

import { connect } from 'react-redux';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { Mutation } from '@apollo/client/react/components';
import { CREATE_CHATROOM_MUTATION } from 'graphql/Mutations/Chat';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import Input from 'components/General/Input';
import ButtonTransparent from 'components/General/ButtonTransparent';
import { LegacyEditor } from 'components/PreviewEditor';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';

import { StateType, ActionContentType } from 'reducers/types';
import { ChatroomCreateModalProps } from './types';
import {
  CreateChatroomMutation,
  CreateChatroomMutationVariables,
} from 'graphql/Mutations/generated/CreateChatroomMutation';
import { ApolloError } from '@apollo/client';

const ChatroomCreateModal = ({
  chatroomCreateModal,
  setFalseChatroomCreateModal,
  setChannel,
}: ChatroomCreateModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null!);
  const descriptionInputRef = useRef<LegacyEditor>(null!);

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
        <Mutation<CreateChatroomMutation, CreateChatroomMutationVariables>
          mutation={CREATE_CHATROOM_MUTATION}
        >
          {addChatroom => (
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
          )}
        </Mutation>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state: StateType) => ({
  chatroomCreateModal: chatReducer.rootSelector(state).chatroomCreateModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseChatroomCreateModal: () =>
    dispatch(chatReducer.actions.chatroomCreateModal.setFalse()),
  setChannel: (channelName: string) =>
    dispatch(globalReducer.actions.channel.set(channelName)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ChatroomCreateModal);
