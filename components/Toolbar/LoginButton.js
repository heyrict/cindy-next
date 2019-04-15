import React from 'react';
import { Subscribe } from 'unstated';
import { Box, Button } from 'components/General';
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

import LoginForm from './LoginForm';

const container = new OnlyShowContainer();

const LoginButton = ({ login }) => (
  <Subscribe to={[container]}>
    {cont => (
      <Box height={1} width={1}>
        <Button
          width={1}
          height={1}
          p={0}
          borderWidth={0}
          onClick={() => cont.show()}
        >
          Login
        </Button>
        <Modal show={cont.state.show}>
          <ModalHeader>
            Login
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
                  Login
                </FooterButton>
              )}
            </Subscribe>
            <FooterButton bg="karashi" onClick={() => cont.hide()}>
              Close
            </FooterButton>
          </ModalFooter>
        </Modal>
      </Box>
    )}
  </Subscribe>
);

export default withLogin(LoginButton);
