import React, { useState } from 'react';
import { Link } from 'routes';
import { FormattedMessage } from 'react-intl';
import { ButtonTransparent, Img, Box } from 'components/General';
import messages from 'messages/components/toolbar';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Portal } from 'react-portal';
import {
  ToolbarFlex,
  ToolbarButton,
  ToolbarResponsiveContents,
  ToolbarResponsiveButton,
} from './shared';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';
import menuIcon from 'svgs/menu.svg';
import userIcon from 'svgs/user.svg';
import logoInline from 'svgs/logoInline.svg';

import { StateType } from 'reducers/types';
import { ToolbarProps, ToolbarResponsiveMenuType } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Toolbar = ({ user }: ToolbarProps) => {
  const [showMenu, setShowMenu] = useState<null | ToolbarResponsiveMenuType>(
    null,
  );
  return (
    <ToolbarFlex alignItems="center" justifyContent="center">
      <ToolbarButton mr="auto">
        <ButtonTransparent
          height={1}
          width={1}
          color="orange.9"
          onClick={() =>
            setShowMenu(
              showMenu === ToolbarResponsiveMenuType.GENERAL_MENU
                ? null
                : ToolbarResponsiveMenuType.GENERAL_MENU,
            )
          }
        >
          <Img height="xs" src={menuIcon} />
        </ButtonTransparent>
      </ToolbarButton>
      {showMenu === ToolbarResponsiveMenuType.GENERAL_MENU && (
        <Portal>
          <ToolbarResponsiveContents>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" m="1px">
                <Link to="home" passHref>
                  <ButtonTransparentA height={1} width={1} color="orange.9">
                    <FormattedMessage {...messages.home} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" m="1px">
                <Link to="puzzles" passHref>
                  <ButtonTransparentA height={1} width={1} color="orange.9">
                    <FormattedMessage {...messages.puzzle} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" m="1px">
                <ButtonTransparentA
                  href="https://wiki3.jp/cindy-lat"
                  target="_blank"
                  height={1}
                  width={1}
                  color="orange.9"
                >
                  <FormattedMessage {...messages.wiki} />
                </ButtonTransparentA>
              </ToolbarResponsiveButton>
            </Box>
          </ToolbarResponsiveContents>
        </Portal>
      )}
      <ToolbarButton mx="auto">
        <Link to="home" passHref>
          <ButtonTransparentA height={1} width={1} color="orange.9">
            <Img height="xs" src={logoInline} />
          </ButtonTransparentA>
        </Link>
      </ToolbarButton>
      <ToolbarButton ml="auto">
        <ButtonTransparent
          height={1}
          width={1}
          color="orange.9"
          onClick={() =>
            setShowMenu(
              showMenu === ToolbarResponsiveMenuType.USER_MENU
                ? null
                : ToolbarResponsiveMenuType.USER_MENU,
            )
          }
        >
          <Img height="xs" src={userIcon} />
        </ButtonTransparent>
      </ToolbarButton>
      {showMenu === ToolbarResponsiveMenuType.USER_MENU && (
        <Portal>
          <ToolbarResponsiveContents>
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton m="1px" bg="orange.5">
                  <ButtonTransparentA height={1} width={1} color="gray.1">
                    {user.nickname}
                  </ButtonTransparentA>
                </ToolbarResponsiveButton>
              </Box>
            )}
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  m="1px"
                  bg="orange.5"
                  color="gray.1"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <LogoutButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  m="1px"
                  bg="orange.5"
                  color="gray.1"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <LoginButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton bg="orange.5" color="gray.1" m="1px">
                  <SignupButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
          </ToolbarResponsiveContents>
        </Portal>
      )}
    </ToolbarFlex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Toolbar);
