import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { APPLOCALES } from 'settings';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { Flex, ButtonTransparent, Img, Box, RedDot } from 'components/General';
import ActiveUserCounter from 'components/ActiveUserCounter';
import {
  ToolbarFlex,
  ToolbarButton,
  ToolbarResponsiveContents,
  ToolbarResponsiveButton,
} from './shared';
import LoginButton from './Login/LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './Signup/SignupButton';
import SettingsButton from './Settings/SettingsButton';
import MessageBoxButton from './MessageBoxButton';
import menuIcon from 'svgs/menu.svg';
import userIcon from 'svgs/user.svg';
import logoInline from 'svgs/logoInline.svg';
import countryJPIcon from 'svgs/countries/ja_JP.svg';
import countryUSIcon from 'svgs/countries/en_US.svg';

import {
  StateType,
  ToolbarResponsiveMenuType,
  ActionContentType,
} from 'reducers/types';
import { PortalProps } from 'react-portal';
import { ToolbarResponsiveProps } from './types';

const Portal = dynamic<PortalProps>(
  () => import('react-portal').then(mod => mod.Portal),
  {
    ssr: false,
  },
);

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Toolbar = ({
  user,
  directHasnew,
  toolbarMenu,
  toggleToolbarMenu,
  closeToolbarMenu,
  setLanguage,
}: ToolbarResponsiveProps) => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const toolbarMenuRef = useRef<HTMLDivElement | null>(null);

  const hasnew = directHasnew;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(e.target as Node | null) &&
        toolbarMenuRef.current &&
        !toolbarMenuRef.current.contains(e.target as Node | null)
      ) {
        closeToolbarMenu();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <ToolbarFlex alignItems="center" justifyContent="center">
      <ToolbarButton mr="auto">
        <ButtonTransparent
          height={1}
          width={1}
          color="orange.9"
          onClick={() =>
            toggleToolbarMenu(ToolbarResponsiveMenuType.GENERAL_MENU)
          }
        >
          <Img height="xs" src={menuIcon} />
        </ButtonTransparent>
      </ToolbarButton>
      {toolbarMenu === ToolbarResponsiveMenuType.GENERAL_MENU && (
        <Portal>
          <ToolbarResponsiveContents>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" mr="1px" mb="1px">
                <Link href="/puzzles" passHref>
                  <ButtonTransparentA height={1} width={1} color="orange.9">
                    <FormattedMessage {...toolbarMessages.puzzle} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" mr="1px" mb="1px">
                <Link href="/users" passHref>
                  <ButtonTransparentA height={1} width={1} color="orange.9">
                    <FormattedMessage {...toolbarMessages.users} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" mr="1px" mb="1px">
                <ButtonTransparentA
                  href="https://wiki3.jp/cindy-lat"
                  target="_blank"
                  height={1}
                  width={1}
                  color="orange.9"
                >
                  <FormattedMessage {...toolbarMessages.wiki} />
                </ButtonTransparentA>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="orange.4" mr="1px" mb="1px">
                <Link href="/eula" passHref>
                  <ButtonTransparentA height={1} width={1} color="orange.9">
                    <FormattedMessage {...toolbarMessages.eula} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Flex width={1 / 2} alignItems="center" justifyContent="center">
              <ActiveUserCounter />
            </Flex>
          </ToolbarResponsiveContents>
        </Portal>
      )}
      <ToolbarButton mx="auto">
        <Link href="/" passHref>
          <ButtonTransparentA height={1} width={1} color="orange.9">
            <Img height="xs" src={logoInline} />
          </ButtonTransparentA>
        </Link>
      </ToolbarButton>
      <ToolbarButton ml="auto">
        <ButtonTransparent
          style={{ position: 'relative' }}
          height={1}
          width={1}
          color="orange.9"
          onClick={() => toggleToolbarMenu(ToolbarResponsiveMenuType.USER_MENU)}
        >
          <Img height="xs" src={userIcon} />
          {hasnew && <RedDot right={20} top={8} />}
        </ButtonTransparent>
      </ToolbarButton>
      {toolbarMenu === ToolbarResponsiveMenuType.USER_MENU && (
        <Portal>
          <ToolbarResponsiveContents>
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton mr="1px" mb="1px" bg="orange.5">
                  <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                    <ButtonTransparentA height={1} width={1} color="gray.1">
                      {user.nickname}
                    </ButtonTransparentA>
                  </Link>
                </ToolbarResponsiveButton>
              </Box>
            )}
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="orange.5"
                  color="gray.1"
                >
                  <MessageBoxButton />
                  {directHasnew && <RedDot right={20} top={8} />}
                </ToolbarResponsiveButton>
              </Box>
            )}
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="orange.5"
                  color="gray.1"
                  fontWeight="bold"
                >
                  <LogoutButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="orange.5"
                  color="gray.1"
                  fontWeight="bold"
                >
                  <LoginButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  bg="orange.5"
                  color="gray.1"
                  mr="1px"
                  mb="1px"
                >
                  <SignupButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            <Box width={1 / 2}>
              <ToolbarResponsiveButton
                mx="1px"
                mb="1px"
                bg="orange.5"
                color="gray.1"
              >
                <SettingsButton />
              </ToolbarResponsiveButton>
            </Box>
            <ToolbarResponsiveButton
              width={1 / 2}
              bg="orange.5"
              color="gray.1"
              onClick={() => closeToolbarMenu()}
            >
              <ButtonTransparent height={1} onClick={() => setLanguage('ja')}>
                <Img px={1} src={countryJPIcon} height="xs" />
              </ButtonTransparent>
              <ButtonTransparent height={1} onClick={() => setLanguage('en')}>
                <Img px={1} src={countryUSIcon} height="xs" />
              </ButtonTransparent>
            </ToolbarResponsiveButton>
          </ToolbarResponsiveContents>
        </Portal>
      )}
    </ToolbarFlex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  directHasnew: directReducer.rootSelector(state).directHasnew,
  toolbarMenu: globalReducer.rootSelector(state).toolbarMenu,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleToolbarMenu: (value: ToolbarResponsiveMenuType) =>
    dispatch(
      globalReducer.actions.toolbarMenu.toggle(
        value,
        ToolbarResponsiveMenuType.NULL,
      ),
    ),
  closeToolbarMenu: () =>
    dispatch(
      globalReducer.actions.toolbarMenu.set(ToolbarResponsiveMenuType.NULL),
    ),
  setLanguage: (lang: typeof APPLOCALES[0]) =>
    dispatch(globalReducer.actions.language.set(lang)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(Toolbar);
