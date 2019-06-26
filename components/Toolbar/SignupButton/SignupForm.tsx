import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Flex, Box, Input } from 'components/General';

import { connect } from 'react-redux';
import * as loginReducer from 'reducers/login';

import messages from 'messages/components/auth';
import { ActionContentType, StateType } from 'reducers/types';
import { SignupFormProps } from './types';

const SignupForm = ({
  nickname,
  username,
  password,
  errors,
  setNickname,
  setUsername,
  setPassword,
}: SignupFormProps) => {
  return (
    <Flex flexWrap="wrap" alignItems="center">
      <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
        <FormattedMessage {...messages.nickname}>
          {msg => <label>{msg}</label>}
        </FormattedMessage>
      </Box>
      <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
        <Input
          name="nickname"
          type="text"
          value={nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          width={[1, 0.9]}
          borderRadius={1}
        />
      </Box>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            color="red.6"
            key={`${error.type}-${error.message}`}
          >
            {error.type}: {error.message}
          </Box>
        ))}
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  nickname: loginReducer.rootSelector(state).nickname,
  username: loginReducer.rootSelector(state).username,
  password: loginReducer.rootSelector(state).password,
  errors: loginReducer.rootSelector(state).errors,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setNickname: (nickname: string) =>
    dispatch(loginReducer.actions.setNickname(nickname)),
  setUsername: (username: string) =>
    dispatch(loginReducer.actions.setUsername(username)),
  setPassword: (password: string) =>
    dispatch(loginReducer.actions.setPassword(password)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SignupForm);
