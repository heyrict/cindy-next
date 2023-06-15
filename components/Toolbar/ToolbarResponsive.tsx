import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { APPLOCALES } from 'settings';
import { getClaims } from 'common/auth';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';
import userMessages from 'messages/components/user';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';
import * as directReducer from 'reducers/direct';

import { Flex, ButtonTransparent, Img, Box, RedDot } from 'components/General';
import ActiveUserCounter from 'components/ActiveUserCounter';
import {
  ToolbarFlex,
  ToolbarButton,
  ToolbarResponsiveContents,
  ToolbarResponsiveButton,
  IconDisplay,
} from './shared';
import ChatroomButton from './ChatroomButton';
import LoginButton from './Login/LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './Signup/SignupButton';
import SettingsButton from './Settings/SettingsButton';
import MessageBoxButton from './MessageBoxButton';
import menuIcon from 'svgs/menu.svg';
import logoInline from 'svgs/logoInline.svg';
import countryJPIcon from 'svgs/countries/ja_JP.svg';
import countryUSIcon from 'svgs/countries/en_US.svg';
import twitterIcon from 'svgs/Twitter_Social_Icon_Circle_Color.svg';

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

  let isStaff = false;
  if (user.id) {
    const claims = getClaims();
    if (
      claims &&
      Array.isArray(claims.allowed_roles) &&
      claims.allowed_roles.some(role => role === 'Staff')
    ) {
      isStaff = true;
    }
  }

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
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <Link href="/puzzles" passHref>
                  <ButtonTransparentA height={1} width={1} color="black">
                    <FormattedMessage {...toolbarMessages.puzzle} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <ChatroomButton color="black" />
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <Link href="/users" passHref>
                  <ButtonTransparentA height={1} width={1} color="black">
                    <FormattedMessage {...toolbarMessages.users} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <ButtonTransparentA
                  href="https://wiki3.jp/cindy-lat"
                  target="_blank"
                  height={1}
                  width={1}
                  color="black"
                >
                  <FormattedMessage {...toolbarMessages.wiki} />
                </ButtonTransparentA>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <ButtonTransparentA
                  href="https://wiki3.jp/cindy-lat/page/40"
                  target="_blank"
                  height={1}
                  width={1}
                  color="black"
                >
                  <FormattedMessage {...toolbarMessages.goldPuzzles} />
                </ButtonTransparentA>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <ButtonTransparentA
                  href="https://www.x-feeder.info/Cindychat/"
                  target="_blank"
                  height={1}
                  width={1}
                  color="black"
                >
                  <FormattedMessage {...toolbarMessages.xfeeder} />
                </ButtonTransparentA>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <Link href="/license_help" passHref>
                  <ButtonTransparentA height={1} width={1} color="black">
                    <FormattedMessage {...toolbarMessages.licenseHelp} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Box width={1 / 2}>
              <ToolbarResponsiveButton bg="preset.menubar.ac" mr="1px" mb="1px">
                <Link href="/eula" passHref>
                  <ButtonTransparentA height={1} width={1} color="black">
                    <FormattedMessage {...toolbarMessages.eula} />
                  </ButtonTransparentA>
                </Link>
              </ToolbarResponsiveButton>
            </Box>
            <Flex width={1}>
              <ButtonTransparentA
                href="https://twitter.com/CindyRt_Bot"
                target="_blank"
                height={1}
              >
                <Img p={1} src={twitterIcon} height="xs" />
              </ButtonTransparentA>
              <Flex flexGrow={1} alignItems="center" justifyContent="center">
                <ActiveUserCounter />
              </Flex>
            </Flex>
          </ToolbarResponsiveContents>
        </Portal>
      )}
      <ToolbarButton mx="auto">
        <Link href="/" passHref>
          <ButtonTransparentA height={1} width={1}>
            <Img height="xs" src={logoInline} />
          </ButtonTransparentA>
        </Link>
      </ToolbarButton>
      <ToolbarButton ml="auto">
        <ButtonTransparent
          style={{ position: 'relative' }}
          height={1}
          width={1}
          onClick={() => toggleToolbarMenu(ToolbarResponsiveMenuType.USER_MENU)}
        >
          <IconDisplay user={user} iconOnly />
          {hasnew && <RedDot right={20} top={8} />}
        </ButtonTransparent>
      </ToolbarButton>
      {toolbarMenu === ToolbarResponsiveMenuType.USER_MENU && (
        <Portal>
          <ToolbarResponsiveContents>
            {user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="preset.menubar.ac"
                >
                  <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                    <ButtonTransparentA height={1} width={1} color="black">
                      <IconDisplay user={user} />
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
                  bg="preset.menubar.ac"
                  color="white"
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
                  bg="preset.menubar.ac"
                  fontWeight="bold"
                >
                  <LogoutButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {user.id && isStaff && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="preset.menubar.ac"
                  fontWeight="bold"
                >
                  <Link href="/admin" passHref>
                    <ButtonTransparentA height={1} width={1} color="black">
                      <FormattedMessage {...userMessages.adminConsole} />
                    </ButtonTransparentA>
                  </Link>
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  mr="1px"
                  mb="1px"
                  bg="preset.menubar.ac"
                  fontWeight="bold"
                >
                  <LoginButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            {!user.id && (
              <Box width={1 / 2}>
                <ToolbarResponsiveButton
                  bg="preset.menubar.ac"
                  mr="1px"
                  mb="1px"
                >
                  <SignupButton />
                </ToolbarResponsiveButton>
              </Box>
            )}
            <Box width={1 / 2}>
              <ToolbarResponsiveButton mx="1px" mb="1px" bg="preset.menubar.ac">
                <SettingsButton />
              </ToolbarResponsiveButton>
            </Box>
            <ToolbarResponsiveButton
              width={1 / 2}
              bg="transparent"
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
    dispatch(settingReducer.actions.language.set(lang)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Toolbar);
