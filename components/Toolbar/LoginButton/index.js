import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Box, ButtonTransparent } from 'components/General';
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

const LoginButton = ({
  login,
  loginModal,
  setTrueLoginModal,
  setFalseLoginModal,
}) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      width={1}
      height={1}
      p={0}
      color="gray.1"
      style={{
        fontWeight: 'bold',
      }}
      onClick={() => setTrueLoginModal()}
    >
      <FormattedMessage {...messages.login} />
    </ButtonTransparent>
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
  </Box>
);

const mapStateToProps = state => ({
  loginModal: loginReducer.rootSelector(state).loginModal,
});

const mapDispatchToProps = dispatch => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.setTrueLoginModal()),
  setFalseLoginModal: () => dispatch(loginReducer.actions.setFalseLoginModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withLogin,
  withRedux,
)(LoginButton);
