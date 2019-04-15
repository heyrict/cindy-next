import React from 'react';
import { Subscribe } from 'unstated';
import { Flex, Box, Input } from 'components/General';
import LoginFormContainer from 'containers/forms/LoginForm';

const LoginForm = () => {
  return (
    <Subscribe to={[LoginFormContainer]}>
      {cont => (
        <Flex flexWrap="wrap" alignItems="center">
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <label>Username</label>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <Input
              name="username"
              type="text"
              value={cont.state.username}
              onChange={e => cont.handleUsernameChange(e.target.value)}
              width={[1, 0.9]}
              borderRadius={1}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <label>Password</label>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <Input
              name="password"
              type="password"
              value={cont.state.password}
              onChange={e => cont.handlePasswordChange(e.target.value)}
              width={[1, 0.9]}
              borderRadius={1}
            />
          </Box>
          {cont.state.errors &&
            cont.state.errors.map(error => (
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
      )}
    </Subscribe>
  );
};

export default LoginForm;
