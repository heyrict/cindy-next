import React from 'react';
import { Subscribe } from 'unstated';
import { FormattedMessage } from 'react-intl';
import { Flex, Box, Input } from 'components/General';
import SignupFormContainer from 'containers/forms/SignupForm';

import messages from 'messages/components/auth';

const SignupForm = () => {
  return (
    <Subscribe to={[SignupFormContainer]}>
      {cont => (
        <Flex flexWrap="wrap" alignItems="center">
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...messages.nickname}>
              {msg => (
                <label>{msg}</label>
              )}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <Input
              name="nickname"
              type="text"
              value={cont.state.nickname}
              onChange={e => cont.handleNicknameChange(e.target.value)}
              width={[1, 0.9]}
              borderRadius={1}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...messages.username}>
              {msg => (
                <label>{msg}</label>
              )}
            </FormattedMessage>
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
            <FormattedMessage {...messages.password}>
              {msg => (
                <label>{msg}</label>
              )}
            </FormattedMessage>
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

export default SignupForm;
