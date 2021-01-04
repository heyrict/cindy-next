import React from 'react';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/auth';

import { FooterButton } from 'components/Modal';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import { ActionContentType, StateType } from 'reducers/types';
import { OKButtonProps } from './types';

const OKButton = ({ login, username, password, resetForm }: OKButtonProps) => (
  <FooterButton
    bg="cyan.6"
    color="white"
    onClick={() => {
      login(username, password).then(res => {
        const { error } = res;
        if (error) {
          error.forEach(e => toast.error(e));
        } else {
          resetForm();
        }
      });
    }}
  >
    <FormattedMessage {...messages.login} />
  </FooterButton>
);

const mapStateToProps = (state: StateType) => ({
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
