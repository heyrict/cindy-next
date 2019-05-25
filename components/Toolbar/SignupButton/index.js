import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Box, ButtonTransparent } from 'components/General';
import { withSignup } from 'components/Auth';
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

import SignupForm from './SignupForm';
import OKButton from './OKButton';

const SignupButton = ({
  signup,
  signupModal,
  setTrueSignupModal,
  setFalseSignupModal,
}) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      width={1}
      height={1}
      p={0}
      color="taikoh"
      style={{
        fontWeight: 'bold',
      }}
      onClick={() => setTrueSignupModal()}
    >
      <FormattedMessage {...messages.signup} />
    </ButtonTransparent>
    <Modal show={signupModal} closefn={() => setFalseSignupModal()}>
      <ModalHeader>
        <FormattedMessage {...messages.signup} />
        <ModalCloseBtn onClick={() => setFalseSignupModal()} />
      </ModalHeader>
      <ModalBody>
        <SignupForm />
      </ModalBody>
      <ModalFooter>
        <OKButton signup={signup} />
        <FooterButton bg="karashi" onClick={() => setFalseSignupModal()}>
          <FormattedMessage {...commonMessages.close} />
        </FooterButton>
      </ModalFooter>
    </Modal>
  </Box>
);

const mapStateToProps = state => ({
  signupModal: loginReducer.rootSelector(state).signupModal,
});

const mapDispatchToProps = dispatch => ({
  setTrueSignupModal: () => dispatch(loginReducer.actions.setTrueSignupModal()),
  setFalseSignupModal: () =>
    dispatch(loginReducer.actions.setFalseSignupModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRedux,
  withSignup,
)(SignupButton);
