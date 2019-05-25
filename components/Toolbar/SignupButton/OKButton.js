import React from 'react';
import PropTypes from 'prop-types';
import { FooterButton } from 'components/Modal';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/auth';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

const OKButton = ({
  signup,
  nickname,
  username,
  password,
  setErrors,
  resetForm,
}) => (
  <FooterButton
    bg="chigusa"
    color="hakuren"
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

OKButton.propTypes = {
  signup: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setErrors: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  nickname: loginReducer.rootSelector(state).nickname,
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
});

const mapDispatchToProps = dispatch => ({
  setErrors: value => dispatch(loginReducer.actions.setErrors(value)),
  resetForm: () => dispatch(loginReducer.actions.resetForm()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(OKButton);
