import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
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

import { StateType, ActionContentType } from 'reducers/types';
import { SignupModalProps } from './types';

const SignupModal = ({
  signup,
  signupModal,
  setFalseSignupModal,
}: SignupModalProps) => (
  <Modal show={signupModal} closefn={() => setFalseSignupModal()}>
    <ModalHeader>
      <FormattedMessage {...messages.signup} />
      <ModalCloseBtn onClick={() => setFalseSignupModal()} />
    </ModalHeader>
    <ModalBody>
      <SignupForm signup={signup} />
    </ModalBody>
    <ModalFooter>
      <OKButton signup={signup} />
      <FooterButton onClick={() => setFalseSignupModal()}>
        <FormattedMessage {...commonMessages.close} />
      </FooterButton>
    </ModalFooter>
  </Modal>
);

const mapStateToProps = (state: StateType) => ({
  signupModal: loginReducer.rootSelector(state).signupModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSignup, withRedux)(SignupModal);
