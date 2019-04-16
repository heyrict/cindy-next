import React from 'react';
import { Subscribe } from 'unstated';
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
import OnlyShowContainer from 'containers/reusable/OnlyShow';
import SignupFormContainer from 'containers/forms/SignupForm';

import messages from 'messages/components/auth';
import commonMessages from 'messages/common';

import SignupForm from './SignupForm';

const container = new OnlyShowContainer();

const SignupButton = ({ signup }) => (
  <Subscribe to={[container]}>
    {cont => (
      <Box height={1} width={1}>
        <ButtonTransparent
          width={1}
          height={1}
          p={0}
          color="taikoh"
          style={{
            fontWeight: 'bold',
          }}
          onClick={() => cont.show()}
        >
          <FormattedMessage {...messages.signup} />
        </ButtonTransparent>
        <Modal show={cont.state.show}>
          <ModalHeader>
            <FormattedMessage {...messages.signup} />
            <ModalCloseBtn onClick={() => cont.hide()} />
          </ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>
          <ModalFooter>
            <Subscribe to={[SignupFormContainer]}>
              {sfcont => (
                <FooterButton
                  bg="chigusa"
                  color="hakuren"
                  onClick={() => {
                    const { nickname, username, password } = sfcont.state;
                    signup(nickname, username, password)
                      .then(res => {
                        const { errors } = res;
                        if (errors) {
                          sfcont.setErrors(errors);
                        } else {
                          sfcont.resetState();
                          cont.hide();
                        }
                      })
                      .catch(error => {
                        console.log(error);
                        sfcont.setErrors([
                          {
                            type: 'InternalServerError',
                            message: error.message,
                          },
                        ]);
                      });
                  }}
                >
                  <FormattedMessage {...messages.signup} />
                </FooterButton>
              )}
            </Subscribe>
            <FooterButton bg="karashi" onClick={() => cont.hide()}>
              <FormattedMessage {...commonMessages.close} />
            </FooterButton>
          </ModalFooter>
        </Modal>
      </Box>
    )}
  </Subscribe>
);

export default withSignup(SignupButton);
