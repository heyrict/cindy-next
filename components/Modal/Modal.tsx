import React from 'react';
import styled from 'theme/styled';

import { Portal } from 'react-portal';
import { ModalComponentsProps, ModalProps } from './types';

export const Shader = styled.div<ModalComponentsProps>`
  z-index: 500;
  display: ${p => (p.show ? 'flex' : 'none')};
  opacity: ${p => (p.show ? 1 : 0)};
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.6) 100%
  );
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const ModalContainer = styled.div<ModalComponentsProps>`
  position: fixed;
  z-index: 600;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  display: ${p => (p.show ? 'flex' : 'none')};
  justify-content: center;
  overflow-y: auto;
  align-items: flex-start;
  padding: '50px 0';
`;

export const Container = styled.div<ModalComponentsProps>`
  opacity: ${p => (p.show ? 1 : 0)};
  overflow-y: auto;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  background: ${p => p.theme.colors.orange[4]};
  border-radius: 5px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3em;
  width: 80%;
`;

class Modal extends React.PureComponent<ModalProps> {
  render() {
    return (
      <Portal>
        <React.Fragment>
          <Shader className="modal-shade" show={this.props.show} />
          <ModalContainer className="modal-container" show={this.props.show}>
            <Container className="modal" show={this.props.show}>
              {this.props.children}
            </Container>
          </ModalContainer>
        </React.Fragment>
      </Portal>
    );
  }
}

export default Modal;
