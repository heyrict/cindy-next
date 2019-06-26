import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Flex, Button, Input } from 'components/General';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';

import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

import { StateType, ActionContentType } from 'reducers/types';
import { ChannelChangeModalProps } from './types';

const ChannelChangeModal = ({
  channelChangeInput,
  channelChangeModal,
  setChannel,
  setChannelChangeInput,
  setFalseChannelChangeModal,
}: ChannelChangeModalProps) => (
  <Modal show={channelChangeModal} closefn={() => setFalseChannelChangeModal()}>
    <ModalHeader>
      <FormattedMessage {...chatMessages.changeChannel} />
      <ModalCloseBtn onClick={() => setFalseChannelChangeModal()} />
    </ModalHeader>
    <ModalBody>
      <Flex mb={1}>
        <FormattedMessage {...commonMessages.default}>
          {msg => (
            <Input
              type="text"
              placeholder={msg as string}
              width={3 / 4}
              value={channelChangeInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChannelChangeInput(e.target.value)
              }
            />
          )}
        </FormattedMessage>
        <Button
          width={1 / 4}
          onClick={() => {
            setChannel(channelChangeInput);
            setFalseChannelChangeModal();
          }}
        >
          <FormattedMessage {...commonMessages.change} />
        </Button>
      </Flex>
      <Button
        width={1}
        onClick={() => {
          setChannel('');
          setFalseChannelChangeModal();
        }}
      >
        <FormattedMessage {...chatMessages.changeToDefaultChannel} />
      </Button>
    </ModalBody>
  </Modal>
);

const mapStateToProps = (state: StateType) => ({
  channelChangeInput: chatReducer.rootSelector(state).channelChangeInput,
  channelChangeModal: chatReducer.rootSelector(state).channelChangeModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannelChangeInput: (value: string) =>
    dispatch(chatReducer.actions.setChannelChangeInput(value)),
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.setChannel(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.setFalseChannelChangeModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelChangeModal);
