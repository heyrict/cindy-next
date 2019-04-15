import React from 'react';
import styled from '@emotion/styled';
import { Subscribe } from 'unstated';
import { Box, Flex } from 'components/General';
import AuthContainer from 'containers/global/Auth';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const ToolbarFlex = styled(Flex)`
  height: ${p => p.theme.sizes.toolbar};
  text-align: center;
`;

const ToolbarButton = styled(Box)`
  width: ${p => p.theme.sizes.toolbutton};
  height: ${p => p.theme.sizes.toolbar};
`;

const Toolbar = () => {
  return (
    <Subscribe to={[AuthContainer]}>
      {cont => (
        <ToolbarFlex alignItems="center" justifyContents="center">
          <ToolbarButton>A</ToolbarButton>
          <ToolbarButton>B</ToolbarButton>
          <ToolbarButton>C</ToolbarButton>
          {cont.state.user.id && (
            <ToolbarButton ml="auto">
              <LogoutButton />
            </ToolbarButton>
          )}
          {!cont.state.user.id && (
            <ToolbarButton ml="auto">
              <LoginButton />
            </ToolbarButton>
          )}
        </ToolbarFlex>
      )}
    </Subscribe>
  );
};

export default Toolbar;
