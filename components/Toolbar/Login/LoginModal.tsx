import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withLogin } from 'components/Auth';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';
import messages from 'messages/components/auth';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import LoginForm from './LoginForm';
import OKButton from './OKButton';

import { StateType, ActionContentType } from 'reducers/types';
import { LoginModalProps } from './types';

const LoginModal = ({
  login,
  loginModal,
  setFalseLoginModal,
}: LoginModalProps) => (
  <Modal show={loginModal} closefn={() => setFalseLoginModal()}>
    <ModalHeader>
      <FormattedMessage {...messages.login} />
      <ModalCloseBtn onClick={() => setFalseLoginModal()} />
    </ModalHeader>
    <ModalBody>
      <LoginForm />
    </ModalBody>
    <ModalFooter>
      <OKButton login={login} />
      <FooterButton
        bg="orange.5"
        color="black"
        onClick={() => setFalseLoginModal()}
      >
        <FormattedMessage {...commonMessages.close} />
      </FooterButton>
    </ModalFooter>
  </Modal>
);

const mapStateToProps = (state: StateType) => ({
  loginModal: loginReducer.rootSelector(state).loginModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseLoginModal: () =>
    dispatch(loginReducer.actions.loginModal.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withLogin, withRedux)(LoginModal);
