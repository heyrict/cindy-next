import React from 'react';
import { FooterButton } from 'components/Modal';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';
import { OKButtonProps } from './types';
import { StateType, ActionContentType, AuthErrorType } from 'reducers/types';

const OKButton = ({
  signup,
  nickname,
  username,
  password,
  setErrors,
  resetForm,
}: OKButtonProps) => (
  <FooterButton
    bg="cyan.6"
    color="white"
    onClick={() => {
      signup(nickname, username, password)
        .then(res => {
          const { errors } = res;
          if (errors) {
            setErrors(errors);
          } else {
            resetForm();
          }
        })
        .catch(error => {
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
    <FormattedMessage {...messages.signup} />
  </FooterButton>
);

const mapStateToProps = (state: StateType) => ({
  nickname: loginReducer.rootSelector(state).nickname,
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
