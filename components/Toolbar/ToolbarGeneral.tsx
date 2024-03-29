import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { APPLOCALES } from 'settings';
import { getClaims } from 'common/auth';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';
import userMessages from 'messages/components/user';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { Portal } from 'react-portal';
import { Manager, Reference, Popper } from 'react-popper';
import { Flex, Box, ButtonTransparent, Img, RedDot } from 'components/General';
import ActiveUserCounter from 'components/ActiveUserCounter';
import ChatroomButton from './ChatroomButton';
import LoginButton from './Login/LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './Signup/SignupButton';
import SettingsButton from './Settings/SettingsButton';
import MessageBoxButton from './MessageBoxButton';
import logoInline from 'svgs/logoInline.svg';
import chevronUpIcon from 'svgs/chevronUp.svg';
import chevronDownIcon from 'svgs/chevronDown.svg';
import countryJPIcon from 'svgs/countries/ja_JP.svg';
import countryUSIcon from 'svgs/countries/en_US.svg';
import twitterIcon from 'svgs/Twitter_Social_Icon_Circle_Color.svg';

import { StateType, ActionContentType } from 'reducers/types';
import { ToolbarProps } from './types';
import {
  ToolbarFlex,
  ToolbarButton,
  ToolbarDropdownContents,
  IconDisplay,
} from './shared';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Toolbar = ({ user, setLanguage, directHasnew }: ToolbarProps) => {
  const [dropDown, setDropDown] = useState(false);
  const userBtnRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const [helpDropDown, setHelpDropDown] = useState(false);
  const helpBtnRef = useRef<HTMLDivElement | null>(null);
  const helpDropDownRef = useRef<HTMLDivElement | null>(null);

  const [comDropDown, setComDropDown] = useState(false);
  const comBtnRef = useRef<HTMLDivElement | null>(null);
  const comDropDownRef = useRef<HTMLDivElement | null>(null);

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
      // For User dropdown
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node | null) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target as Node | null)
      ) {
        setDropDown(false);
      }

      // For Communication dropdown
      if (
        comDropDownRef.current &&
        !comDropDownRef.current.contains(e.target as Node | null) &&
        comBtnRef.current &&
        !comBtnRef.current.contains(e.target as Node | null)
      ) {
        setComDropDown(false);
      }

      // For Help dropdown
      if (
        helpDropDownRef.current &&
        !helpDropDownRef.current.contains(e.target as Node | null) &&
        helpBtnRef.current &&
        !helpBtnRef.current.contains(e.target as Node | null)
      ) {
        setHelpDropDown(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <ToolbarFlex alignItems="center" justifyContent="center">
      <ToolbarFlex>
        <Link href="/" passHref legacyBehavior>
          <ButtonTransparentA
            px={3}
            height={1}
            width={1}
            color="preset.menubar.fg"
          >
            <Img height="xs" src={logoInline} />
          </ButtonTransparentA>
        </Link>
        <ToolbarButton bg="preset.menubar.ac" mr="1px">
          <Link href="/puzzles" passHref>
            <ButtonTransparentA height={1} width={1} color="preset.menubar.fg">
              <FormattedMessage {...toolbarMessages.puzzle} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <Manager>
          <Reference>
            {({ ref }: any) => (
              <ToolbarButton
                ref={(r: HTMLDivElement | null) => {
                  ref(r);
                  comBtnRef.current = r;
                }}
                mr="1px"
                bg="preset.menubar.ac"
              >
                <ButtonTransparentA
                  style={{ position: 'relative' }}
                  height={1}
                  width={1}
                  color="preset.menubar.fg"
                  onClick={() => setComDropDown(!comDropDown)}
                >
                  <FormattedMessage {...toolbarMessages.communication} />
                  <Img
                    pl={1}
                    src={comDropDown ? chevronUpIcon : chevronDownIcon}
                    minWidth="xxs"
                    maxWidth="xxs"
                  />
                </ButtonTransparentA>
              </ToolbarButton>
            )}
          </Reference>
          {comDropDown && (
            <Portal>
              <Popper placement="bottom-end" strategy="fixed">
                {({ ref, style, placement }: any) => (
                  <ToolbarDropdownContents
                    ref={(r: HTMLDivElement | null) => {
                      ref(r);
                      comDropDownRef.current = r;
                    }}
                    style={style}
                    data-placement={placement}
                  >
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <Link href="/users" passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="preset.menubar.fg"
                        >
                          <FormattedMessage {...toolbarMessages.users} />
                        </ButtonTransparentA>
                      </Link>
                    </ToolbarButton>
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <ChatroomButton color="preset.menubar.fg" />
                    </ToolbarButton>
                  </ToolbarDropdownContents>
                )}
              </Popper>
            </Portal>
          )}
        </Manager>
        <Manager>
          <Reference>
            {({ ref }: any) => (
              <ToolbarButton
                ref={(r: HTMLDivElement | null) => {
                  ref(r);
                  helpBtnRef.current = r;
                }}
                mr="1px"
                bg="preset.menubar.ac"
              >
                <ButtonTransparentA
                  style={{ position: 'relative' }}
                  height={1}
                  width={1}
                  color="preset.menubar.fg"
                  onClick={() => setHelpDropDown(!helpDropDown)}
                >
                  <FormattedMessage {...toolbarMessages.help} />
                  <Img
                    pl={1}
                    src={helpDropDown ? chevronUpIcon : chevronDownIcon}
                    minWidth="xxs"
                    maxWidth="xxs"
                  />
                </ButtonTransparentA>
              </ToolbarButton>
            )}
          </Reference>
          {helpDropDown && (
            <Portal>
              <Popper placement="bottom-end" strategy="fixed">
                {({ ref, style, placement }: any) => (
                  <ToolbarDropdownContents
                    ref={(r: HTMLDivElement | null) => {
                      ref(r);
                      helpDropDownRef.current = r;
                    }}
                    style={style}
                    data-placement={placement}
                  >
                    <ToolbarButton bg="preset.menubar.bg" fontWeight="bold">
                      <ButtonTransparentA
                        href="https://wiki3.jp/cindy-lat"
                        target="_blank"
                        height={1}
                        width={1}
                        color="preset.menubar.fg"
                      >
                        <FormattedMessage {...toolbarMessages.wiki} />
                      </ButtonTransparentA>
                    </ToolbarButton>
                    <ToolbarButton bg="preset.menubar.bg" fontWeight="bold">
                      <ButtonTransparentA
                        href="https://wiki3.jp/cindy-lat/page/40"
                        target="_blank"
                        height={1}
                        width={1}
                        color="preset.menubar.fg"
                      >
                        <FormattedMessage {...toolbarMessages.goldPuzzles} />
                      </ButtonTransparentA>
                    </ToolbarButton>
                    <ToolbarButton bg="preset.menubar.bg" fontWeight="bold">
                      <ButtonTransparentA
                        href="https://www.x-feeder.info/Cindychat/"
                        target="_blank"
                        height={1}
                        width={1}
                        color="preset.menubar.fg"
                      >
                        <FormattedMessage {...toolbarMessages.xfeeder} />
                      </ButtonTransparentA>
                    </ToolbarButton>
                    <ToolbarButton bg="preset.menubar.bg" fontWeight="bold">
                      <Link href="/eula" passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="preset.menubar.fg"
                        >
                          <FormattedMessage {...toolbarMessages.eula} />
                        </ButtonTransparentA>
                      </Link>
                    </ToolbarButton>
                    <ToolbarButton bg="preset.menubar.bg" fontWeight="bold">
                      <Link href="/license_help" passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="preset.menubar.fg"
                        >
                          <FormattedMessage {...toolbarMessages.licenseHelp} />
                        </ButtonTransparentA>
                      </Link>
                    </ToolbarButton>
                  </ToolbarDropdownContents>
                )}
              </Popper>
            </Portal>
          )}
        </Manager>
        <Box minWidth="sm" overflow="hidden" bg="transparent">
          <ButtonTransparentA
            href="https://twitter.com/CindyRt_Bot"
            target="_blank"
            height={1}
          >
            <Img px={1} src={twitterIcon} height="xs" />
          </ButtonTransparentA>
        </Box>
        <Flex
          color="preset.menubar.fg"
          ml={1}
          minWidth="max-content"
          alignItems="center"
          justifyContent="center"
        >
          <ActiveUserCounter />
        </Flex>
      </ToolbarFlex>
      <Manager>
        <Reference>
          {({ ref }: any) => (
            <ToolbarButton
              ref={(r: HTMLDivElement | null) => {
                ref(r);
                userBtnRef.current = r;
              }}
              ml="auto"
              bg="preset.menubar.ac"
            >
              <ButtonTransparentA
                style={{ position: 'relative' }}
                height={1}
                width={1}
                color="preset.menubar.fg"
                onClick={() => setDropDown(!dropDown)}
              >
                <IconDisplay user={user} />
                <Img
                  px={1}
                  src={dropDown ? chevronUpIcon : chevronDownIcon}
                  minWidth="xxs"
                  maxWidth="xxs"
                />
                {hasnew && <RedDot right={20} top={8} />}
              </ButtonTransparentA>
            </ToolbarButton>
          )}
        </Reference>
        {dropDown && (
          <Portal>
            <Popper placement="bottom-end" strategy="fixed">
              {({ ref, style, placement }: any) => (
                <ToolbarDropdownContents
                  ref={(r: HTMLDivElement | null) => {
                    ref(r);
                    dropDownRef.current = r;
                  }}
                  style={style}
                  data-placement={placement}
                >
                  {user.id && (
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="preset.menubar.fg"
                          onClick={() => setDropDown(!dropDown)}
                        >
                          <FormattedMessage {...userMessages.profile} />
                        </ButtonTransparentA>
                      </Link>
                    </ToolbarButton>
                  )}
                  {user.id && (
                    <ToolbarButton
                      style={{ position: 'relative' }}
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <MessageBoxButton />
                      {directHasnew && <RedDot right={20} top={8} />}
                    </ToolbarButton>
                  )}
                  {user.id && (
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <LogoutButton />
                    </ToolbarButton>
                  )}
                  {!user.id && (
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <LoginButton />
                    </ToolbarButton>
                  )}
                  {!user.id && (
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                    >
                      <SignupButton />
                    </ToolbarButton>
                  )}
                  {isStaff && (
                    <ToolbarButton
                      bg="preset.menubar.bg"
                      color="preset.menubar.fg"
                      fontWeight="bold"
                    >
                      <Link href="/admin" passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="preset.menubar.fg"
                          onClick={() => setDropDown(!dropDown)}
                        >
                          <FormattedMessage {...userMessages.adminConsole} />
                        </ButtonTransparentA>
                      </Link>
                    </ToolbarButton>
                  )}
                  <ToolbarButton
                    bg="preset.menubar.bg"
                    color="preset.menubar.fg"
                  >
                    <SettingsButton />
                  </ToolbarButton>
                  <ToolbarButton
                    bg="preset.menubar.bg"
                    color="preset.menubar.fg"
                  >
                    <ButtonTransparent
                      height={1}
                      onClick={() => setLanguage('ja')}
                    >
                      <Img px={1} src={countryJPIcon} height="xs" />
                    </ButtonTransparent>
                    <ButtonTransparent
                      height={1}
                      onClick={() => setLanguage('en')}
                    >
                      <Img px={1} src={countryUSIcon} height="xs" />
                    </ButtonTransparent>
                  </ToolbarButton>
                </ToolbarDropdownContents>
              )}
            </Popper>
          </Portal>
        )}
      </Manager>
    </ToolbarFlex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  directHasnew: directReducer.rootSelector(state).directHasnew,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setLanguage: (lang: typeof APPLOCALES[0]) =>
    dispatch(settingReducer.actions.language.set(lang)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Toolbar);
