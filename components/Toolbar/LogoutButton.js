import React from 'react';
import { Box, Button } from 'components/General';
import { withLogout } from 'components/Auth';

const LoginButton = ({ logout }) => (
  <Box height={1} width={1}>
    <Button width={1} height={1} p={0} borderWidth={0} onClick={logout}>
      Logout
    </Button>
  </Box>
);

export default withLogout(LoginButton);
