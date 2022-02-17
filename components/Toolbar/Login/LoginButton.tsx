import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Box, ButtonTransparent } from 'components/General';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import { ActionContentType } from 'reducers/types';
import { LoginButtonProps } from './types';

const LoginButton = ({ setTrueLoginModal }: LoginButtonProps) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      width={1}
      height={1}
      p={0}
      color="preset.menubar.fg"
      fontWeight="bold"
      onClick={() => setTrueLoginModal()}
    >
      <FormattedMessage {...messages.login} />
    </ButtonTransparent>
  </Box>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.loginModal.setTrue()),
});

const withRedux = connect(null, mapDispatchToProps);

export default compose(withRedux)(LoginButton);
