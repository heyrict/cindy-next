import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'routes';
import { FormattedMessage } from 'react-intl';
import { Box, Flex, ButtonTransparent } from 'components/General';
import messages from 'messages/components/toolbar';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';

import { StateType } from 'reducers/types';
import { ToolbarProps } from './types';

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

const Toolbar = ({ user }: ToolbarProps) => {
  return (
    <ToolbarFlex alignItems="center" justifyContents="center">
      <ToolbarFlex>
        <ToolbarButton bg="orange.4">
          <Link to="home">
            <a>
              <ButtonTransparent
                height={1}
                width={1}
                border="1px solid"
                borderColor="red.6"
              >
                <FormattedMessage {...messages.home} />
              </ButtonTransparent>
            </a>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4">
          <Link to="puzzles">
            <a>
              <ButtonTransparent
                height={1}
                width={1}
                border="1px solid"
                borderColor="red.6"
              >
                <FormattedMessage {...messages.puzzle} />
              </ButtonTransparent>
            </a>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4">
          <a href="https://wiki3.jp/cindy-lat" target="_blank">
            <ButtonTransparent
              height={1}
              width={1}
              border="1px solid"
              borderColor="red.6"
            >
              <FormattedMessage {...messages.wiki} />
            </ButtonTransparent>
          </a>
        </ToolbarButton>
      </ToolbarFlex>
      {user.id && (
        <ToolbarButton ml="auto" bg="orange.5">
          <ButtonTransparent height={1} width={1} color="gray.1">
            {user.nickname}
          </ButtonTransparent>
        </ToolbarButton>
      )}
      {user.id && (
        <ToolbarButton
          bg="orange.5"
          color="gray.1"
          style={{
            fontWeight: 'bold',
          }}
        >
          <LogoutButton />
        </ToolbarButton>
      )}
      {!user.id && (
        <ToolbarButton
          ml="auto"
          bg="orange.5"
          color="gray.1"
          style={{
            fontWeight: 'bold',
          }}
        >
          <LoginButton />
        </ToolbarButton>
      )}
      {!user.id && (
        <ToolbarButton bg="orange.5" color="gray.1">
          <SignupButton />
        </ToolbarButton>
      )}
    </ToolbarFlex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Toolbar);
