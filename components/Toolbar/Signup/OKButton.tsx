import React from 'react';
import { FooterButton } from 'components/Modal';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';
import { OKButtonProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const OKButton = ({
  signup,
  nickname,
  username,
  password,
  resetForm,
}: OKButtonProps) => (
  <FooterButton
    bg="cyan.6"
    color="white"
    onClick={() => {
      signup(nickname, username, password).then(res => {
        const { error } = res;
        if (error) {
          error.forEach(e => toast.error(e));
        } else {
          resetForm();
        }
      });
    }}
  >
    <FormattedMessage {...messages.signup} />
  </FooterButton>
);

const mapStateToProps = (state: StateType) => ({
  nickname: loginReducer.rootSelector(state).nickname,
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  resetForm: () => dispatch(loginReducer.actions.resetForm()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(OKButton);
