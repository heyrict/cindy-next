import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Portal } from 'react-portal';

export const Shader = styled.div`
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

export const ModalContainer = styled.div`
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

export const Container = styled.div`
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

class Modal extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.any,
  };
  render() {
    return (
      <Portal>
        <div>
          <Shader className="modal-shade" show={this.props.show} />
          <ModalContainer className="modal-container" show={this.props.show}>
            <Container className="modal" show={this.props.show}>
              {this.props.children}
            </Container>
          </ModalContainer>
        </div>
      </Portal>
    );
  }
}

export default Modal;
