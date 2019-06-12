/*
 * ChatInput
 *
 * TODO DELETE THIS!
 * legacy modal based chat input
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { line2md } from 'common';

import Head from 'next/head';
import { Box, ButtonTransparent, Input } from 'components/General';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';
import PreviewEditor from 'components/PreviewEditor';

import { connect } from 'react-redux';
import * as chatReducer from 'reducers/chat';

import 'styles/cindy-easymde.css';

const ChatInputBase = styled.div`
  display: flex;
  width: 100%;
  height: ${p => p.theme.sizes.chatinput};
  background-color: ${p => p.theme.colors.orange[5]};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ChatInput = ({
  cont,
  onSend,
  chatInputModal,
  chatInput,
  setTrueChatInputModal,
  setFalseChatInputModal,
}) => {
  const pEditor = React.createRef();
  return (
    <ChatInputBase>
      <ButtonTransparent
        width={1}
        height={1}
        color="white"
        fontWeight="bold"
        onClick={() => setTrueChatInputModal()}
      >
        Send Chat Message
      </ButtonTransparent>
      <Modal show={chatInputModal} closefn={() => setFalseChatInputModal()}>
        <ModalHeader>
          Send Chat Message
          <ModalCloseBtn onClick={() => setFalseChatInputModal()} />
        </ModalHeader>
        <ModalBody>
          <PreviewEditor ref={pEditor} />
        </ModalBody>
        <ModalFooter>
          <FooterButton
            onClick={() => {
              onSend(pEditor.getText());
              setFalseChatInputModal();
            }}
          >
            Send
          </FooterButton>
        </ModalFooter>
      </Modal>
    </ChatInputBase>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  chatInputModal: PropTypes.bool.isRequired,
  setTrueChatInputModal: PropTypes.func.isRequired,
  setFalseChatInputModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chatInputModal: chatReducer.rootSelector(state).chatInputModal,
});

const mapDispatchToProps = dispatch => ({
  setTrueChatInputModal: () =>
    dispatch(chatReducer.actions.setTrueChatInputModal()),
  setFalseChatInputModal: () =>
    dispatch(chatReducer.actions.setFalseChatInputModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatInput);
