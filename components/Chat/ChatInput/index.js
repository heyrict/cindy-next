import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import SimpleMDE from 'react-simplemde-editor';
import { line2md } from 'common';
import { Box, ButtonTransparent, Input } from 'components/General';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';
import { Subscribe } from 'unstated';
import OnlyShowContainer from 'containers/reusable/OnlyShow';

const modalContainer = new OnlyShowContainer();

const ChatInputBase = styled.div`
  display: flex;
  width: 100%;
  height: ${p => p.theme.heights.chatinput};
  background-color: ${p => p.theme.colors.kuwacha};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ChatInput = ({ cont, onSend }) => {
  return (
    <Subscribe to={[modalContainer, cont]}>
      {(modalCont, inputCont) => (
        <ChatInputBase>
          <Head>
            <link href="/static/css/easymde.min.css" rel="stylesheet" />
          </Head>
          <ButtonTransparent
            width={1}
            height={1}
            color="hakuren"
            fontWeight="bold"
            onClick={() => modalCont.show()}
          >
            Send Chat Message
          </ButtonTransparent>
          <Modal show={modalCont.state.show} closefn={() => modalCont.hide()}>
            <ModalHeader>
              Send Chat Message
              <ModalCloseBtn onClick={() => modalCont.hide()} />
            </ModalHeader>
            <ModalBody>
              <SimpleMDE
                onChange={v => inputCont.handleChange(v)}
                options={{
                  previewRender: line2md,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <FooterButton
                onClick={() => {
                  onSend(inputCont.state.content);
                  modalCont.hide();
                }}
              >
                Send
              </FooterButton>
            </ModalFooter>
          </Modal>
        </ChatInputBase>
      )}
    </Subscribe>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  cont: PropTypes.object.isRequired,
};

export default ChatInput;
