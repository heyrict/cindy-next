import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Box, ButtonTransparent } from 'components/General';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import { ActionContentType } from 'reducers/types';
import { SignupButtonProps } from './types';

const SignupButton = ({ setTrueSignupModal }: SignupButtonProps) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      width={1}
      height={1}
      p={0}
      color="gray.1"
      style={{
        fontWeight: 'bold',
      }}
      onClick={() => setTrueSignupModal()}
    >
      <FormattedMessage {...messages.signup} />
    </ButtonTransparent>
  </Box>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setTrue()),
});

const withRedux = connect(null, mapDispatchToProps);

export default compose(withRedux)(SignupButton);
