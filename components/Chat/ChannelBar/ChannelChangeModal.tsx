import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';
import ChannelChangeInput from './ChannelChangeInput';
import FavoriteChatroomsList from './FavoriteChatroomsList';
import OfficialChatroomsList from './PublicChatroomsList';

import * as chatReducer from 'reducers/chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { StateType, ActionContentType } from 'reducers/types';
import { ChannelChangeModalProps } from './types';

const ChannelChangeModal = ({
  channelChangeModal,
  setFalseChannelChangeModal,
}: ChannelChangeModalProps) => (
  <Modal show={channelChangeModal} closefn={() => setFalseChannelChangeModal()}>
    <ModalHeader>
      <FormattedMessage {...chatMessages.changeChannel} />
      <ModalCloseBtn onClick={() => setFalseChannelChangeModal()} />
    </ModalHeader>
    <ModalBody>
      <ChannelChangeInput />
      <OfficialChatroomsList />
      <FavoriteChatroomsList />
    </ModalBody>
  </Modal>
);

const mapStateToProps = (state: StateType) => ({
  channelChangeModal: chatReducer.rootSelector(state).channelChangeModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ChannelChangeModal);
