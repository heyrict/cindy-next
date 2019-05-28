import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, ButtonTransparent } from 'components/General';
import { withLogout } from 'components/Auth';

import messages from 'messages/components/auth';

const LoginButton = ({ logout }) => (
  <Box height={1} width={1}>
    <FormattedMessage {...messages.logout}>
      {msg => (
        <ButtonTransparent
          width={1}
          height={1}
          p={0}
          color="gray.1"
          style={{
            fontWeight: 'bold',
          }}
          onClick={logout}
        >
          Logout
        </ButtonTransparent>
      )}
    </FormattedMessage>
  </Box>
);

export default withLogout(LoginButton);
