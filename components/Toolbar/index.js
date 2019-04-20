import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { Subscribe } from 'unstated';
import { Box, Flex, Button, ButtonTransparent } from 'components/General';
import AuthContainer from 'containers/global/Auth';
import messages from 'messages/components/toolbar';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';

const ToolbarFlex = styled(Flex)`
  height: ${p => p.theme.sizes.toolbar};
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ToolbarButton = styled(Box)`
  min-width: ${p => p.theme.sizes.toolbuttonMin};
  max-width: ${p => p.theme.sizes.toolbuttonMax};
  height: ${p => p.theme.sizes.toolbar};
`;

const Toolbar = () => {
  return (
    <Subscribe to={[AuthContainer]}>
      {cont => (
        <ToolbarFlex alignItems="center" justifyContents="center">
          <ToolbarFlex>
            <ToolbarButton bg="karashi">
              <Link href="/">
                <a>
                  <ButtonTransparent
                    height={1}
                    width={1}
                    border="1px solid"
                    borderColor="edocha"
                  >
                    <FormattedMessage {...messages.home} />
                  </ButtonTransparent>
                </a>
              </Link>
            </ToolbarButton>
            <ToolbarButton bg="karashi">
              <Link href="/puzzles">
                <a>
                  <ButtonTransparent
                    height={1}
                    width={1}
                    border="1px solid"
                    borderColor="edocha"
                  >
                    <FormattedMessage {...messages.puzzle} />
                  </ButtonTransparent>
                </a>
              </Link>
            </ToolbarButton>
            <ToolbarButton bg="karashi">
              <a href="https://wiki3.jp/cindy-lat" target="_blank">
                <ButtonTransparent
                  height={1}
                  width={1}
                  border="1px solid"
                  borderColor="edocha"
                >
                  <FormattedMessage {...messages.wiki} />
                </ButtonTransparent>
              </a>
            </ToolbarButton>
          </ToolbarFlex>
          {cont.state.user.id && (
            <ToolbarButton ml="auto" bg="yamabukicha">
              <ButtonTransparent height={1} width={1} color="hakuren">
                {cont.state.user.nickname}
              </ButtonTransparent>
            </ToolbarButton>
          )}
          {cont.state.user.id && (
            <ToolbarButton
              bg="yamabukicha"
              color="taikoh"
              style={{
                fontWeight: 'bold',
              }}
            >
              <LogoutButton />
            </ToolbarButton>
          )}
          {!cont.state.user.id && (
            <ToolbarButton
              ml="auto"
              bg="yamabukicha"
              color="taikoh"
              style={{
                fontWeight: 'bold',
              }}
            >
              <LoginButton />
            </ToolbarButton>
          )}
          {!cont.state.user.id && (
            <ToolbarButton bg="yamabukicha" color="taikoh">
              <SignupButton />
            </ToolbarButton>
          )}
        </ToolbarFlex>
      )}
    </Subscribe>
  );
};

export default Toolbar;
