import React from 'react';
import styled from 'theme/styled';
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

const ButtonTransparentA = ButtonTransparent.withComponent('a');

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
  overflow: hidden;
`;

const Toolbar = ({ user }: ToolbarProps) => {
  return (
    <ToolbarFlex alignItems="center" justifyContent="center">
      <ToolbarFlex>
        <ToolbarButton bg="orange.4">
          <Link to="home" passHref>
            <ButtonTransparentA
              height={1}
              width={1}
              border="1px solid"
              borderColor="red.6"
              color="orange.9"
            >
              <FormattedMessage {...messages.home} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4">
          <Link to="puzzles" passHref>
            <ButtonTransparentA
              height={1}
              width={1}
              border="1px solid"
              borderColor="red.6"
              color="orange.9"
            >
              <FormattedMessage {...messages.puzzle} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4">
          <ButtonTransparentA
            href="https://wiki3.jp/cindy-lat"
            target="_blank"
            height={1}
            width={1}
            border="1px solid"
            borderColor="red.6"
            color="orange.9"
          >
            <FormattedMessage {...messages.wiki} />
          </ButtonTransparentA>
        </ToolbarButton>
      </ToolbarFlex>
      {user.id && (
        <ToolbarButton ml="auto" bg="orange.5">
          <ButtonTransparentA height={1} width={1} color="gray.1">
            {user.nickname}
          </ButtonTransparentA>
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
