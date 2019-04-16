import React from 'react';
import { Subscribe } from 'unstated';
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
import OnlyShowContainer from 'containers/reusable/OnlyShow';
import LoginFormContainer from 'containers/forms/LoginForm';
import messages from 'messages/components/auth';
import commonMessages from 'messages/common';

import LoginForm from './LoginForm';

const container = new OnlyShowContainer();

const LoginButton = ({ login }) => (
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
          <FormattedMessage {...messages.login} />
        </ButtonTransparent>
        <Modal show={cont.state.show} closefn={() => cont.hide()}>
          <ModalHeader>
            <FormattedMessage {...messages.login} />
            <ModalCloseBtn onClick={() => cont.hide()} />
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
          <ModalFooter>
            <Subscribe to={[LoginFormContainer]}>
              {lfcont => (
                <FooterButton
                  bg="chigusa"
                  color="hakuren"
                  onClick={() => {
                    const { username, password } = lfcont.state;
                    login(username, password)
                      .then(res => {
                        const { errors } = res;
                        if (errors) {
                          lfcont.setErrors(errors);
                        } else {
                          lfcont.resetState();
                          cont.hide();
                        }
                      })
                      .catch(error => {
                        console.log(error);
                        lfcont.setErrors([
                          {
                            type: 'InternalServerError',
                            message: error.message,
                          },
                        ]);
                      });
                  }}
                >
                  <FormattedMessage {...messages.login} />
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

export default withLogin(LoginButton);
