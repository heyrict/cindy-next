import React from 'react';

import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';
import ChatroomLogs from '../ChannelBar/ChatroomLogs';

import { connect } from 'react-redux';
import * as chatReducer from 'reducers/chat';

import { ChatroomLogsModalProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const ChatroomLogsModal = ({
  descriptionModal,
  setFalseDescriptionModal,
  chatroomId,
  relatedPuzzleId,
}: ChatroomLogsModalProps) =>
  descriptionModal ? (
    <Modal show={descriptionModal} closefn={() => setFalseDescriptionModal()}>
      <ModalHeader>
        Logs
        <ModalCloseBtn onClick={() => setFalseDescriptionModal()} />
      </ModalHeader>
      <ModalBody>
        <ChatroomLogs
          relatedPuzzleId={relatedPuzzleId}
          chatroomId={chatroomId}
        />
      </ModalBody>
    </Modal>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  descriptionModal: chatReducer.rootSelector(state).descriptionModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseDescriptionModal: () =>
    dispatch(chatReducer.actions.descriptionModal.setFalse()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatroomLogsModal);
