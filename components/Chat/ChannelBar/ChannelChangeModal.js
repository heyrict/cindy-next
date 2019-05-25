import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Flex, Button, Input } from 'components/General';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';

import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

const ChannelChangeModal = ({
  channel,
  channelChangeInput,
  channelChangeModal,
  setChannel,
  setChannelChangeInput,
  setFalseChannelChangeModal,
}) => (
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
              placeholder={msg}
              width={3 / 4}
              value={channelChangeInput}
              onChange={e => setChannelChangeInput(e.target.value)}
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

ChannelChangeModal.propTypes = {
  channel: PropTypes.string.isRequired,
  channelChangeInput: PropTypes.string.isRequired,
  channelChangeModal: PropTypes.bool.isRequired,
  setChannelChangeInput: PropTypes.func.isRequired,
  setChannel: PropTypes.func.isRequired,
  setFalseChannelChangeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  channel: globalReducer.rootSelector(state).channel,
  channelChangeInput: chatReducer.rootSelector(state).channelChangeInput,
  channelChangeModal: chatReducer.rootSelector(state).channelChangeModal,
});

const mapDispatchToProps = dispatch => ({
  setChannelChangeInput: value =>
    dispatch(chatReducer.actions.setChannelChangeInput(value)),
  setChannel: value => dispatch(globalReducer.actions.setChannel(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.setFalseChannelChangeModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelChangeModal);
