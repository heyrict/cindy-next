import React from 'react';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import authMessages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { widthSplits } from './constants';
import { ActionContentType } from 'reducers/types';
import { NotLoggedInMessageProps } from './types';

const NotLoggedInMessage = ({
  setTrueLoginModal,
  setTrueSignupModal,
}: NotLoggedInMessageProps) => (
  <Flex justifyContent="center" width={1} mx={widthSplits[1]} my={2}>
    <Box display="inline-flex">
      <FormattedMessage
        {...commonMessages.loginOrSignup}
        values={{
          login: (
            <ButtonTransparent
              color="blue.6"
              px={1}
              onClick={() => setTrueLoginModal()}
            >
              <FormattedMessage {...authMessages.login} />
            </ButtonTransparent>
          ),
          signup: (
            <ButtonTransparent
              color="blue.6"
              px={1}
              onClick={() => setTrueSignupModal()}
            >
              <FormattedMessage {...authMessages.signup} />
            </ButtonTransparent>
          ),
        }}
      />
    </Box>
  </Flex>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.loginModal.setTrue()),
  setTrueSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setTrue()),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(NotLoggedInMessage);
