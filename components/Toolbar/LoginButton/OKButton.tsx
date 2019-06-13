import React from 'react';
import { FooterButton } from 'components/Modal';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';
import { ActionContentType, AuthErrorType, StateType } from 'reducers/types';
import { OKButtonProps } from './types';

const OKButton = ({
  login,
  username,
  password,
  setErrors,
  resetForm,
}: OKButtonProps) => (
  <FooterButton
    bg="cyan.6"
    color="white"
    onClick={() => {
      login(username, password)
        .then(res => {
          const { errors } = res;
          if (errors) {
            setErrors(errors);
          } else {
            resetForm();
          }
        })
        .catch((error: { message: any }) => {
          console.log(error);
          setErrors([
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
);

const mapStateToProps = (state: StateType) => ({
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setErrors: (value: Array<AuthErrorType>) =>
    dispatch(loginReducer.actions.setErrors(value)),
  resetForm: () => dispatch(loginReducer.actions.resetForm()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(OKButton);
