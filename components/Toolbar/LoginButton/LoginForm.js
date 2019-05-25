import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Flex, Box, Input } from 'components/General';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import messages from 'messages/components/auth';

const LoginForm = ({
  username,
  password,
  errors,
  setUsername,
  setPassword,
  setErrors,
}) => {
  return (
    <Flex flexWrap="wrap" alignItems="center">
      <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
        <FormattedMessage {...messages.username}>
          {msg => <label>{msg}</label>}
        </FormattedMessage>
      </Box>
      <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          width={[1, 0.9]}
          borderRadius={1}
        />
      </Box>
      <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
        <FormattedMessage {...messages.password}>
          {msg => <label>{msg}</label>}
        </FormattedMessage>
      </Box>
      <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          width={[1, 0.9]}
          borderRadius={1}
        />
      </Box>
      {errors &&
        errors.map(error => (
          <Box
            width={1}
            mb={2}
            fontColor="imayoh"
            key={`${error.type}-${error.message}`}
          >
            {error.type}: {error.message}
          </Box>
        ))}
    </Flex>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
  errors: loginReducer.rootSelector(state).errors,
});

const mapDispatchToProps = dispatch => ({
  setUsername: value => dispatch(loginReducer.actions.setUsername(value)),
  setPassword: value => dispatch(loginReducer.actions.setPassword(value)),
  setErrors: value => dispatch(loginReducer.actions.setErrors(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(LoginForm);
