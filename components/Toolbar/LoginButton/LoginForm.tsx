import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Flex, Box, Input } from 'components/General';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import messages from 'messages/components/auth';
import { StateType, ActionContentType, AuthErrorType } from 'reducers/types';
import { LoginFormProps } from './types';

const LoginForm = ({
  username,
  password,
  errors,
  setUsername,
  setPassword,
}: LoginFormProps) => {
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
          onChange={(e: React.ChangeEvent<Input>) =>
            setUsername(e.target.value)
          }
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
          onChange={(e: React.ChangeEvent<Input>) =>
            setPassword(e.target.value)
          }
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

const mapStateToProps = (state: StateType) => ({
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
  errors: loginReducer.rootSelector(state).errors,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setUsername: (username: string) =>
    dispatch(loginReducer.actions.setUsername(username)),
  setPassword: (password: string) =>
    dispatch(loginReducer.actions.setPassword(password)),
  setErrors: (errors: Array<AuthErrorType>) =>
    dispatch(loginReducer.actions.setErrors(errors)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(LoginForm);
