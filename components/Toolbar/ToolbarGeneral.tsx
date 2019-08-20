import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { APPLOCALES } from 'settings';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';
import userMessages from 'messages/components/user';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { Portal } from 'react-portal';
import { Manager, Reference, Popper } from 'react-popper';
import { Flex, ButtonTransparent, Img, RedDot } from 'components/General';
import ActiveUserCounter from 'components/ActiveUserCounter';
import LoginButton from './Login/LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './Signup/SignupButton';
import SettingsButton from './Settings/SettingsButton';
import MessageBoxButton from './MessageBoxButton';
import logoInline from 'svgs/logoInline.svg';
import chevronUpIcon from 'svgs/chevronUp.svg';
import chevronDownIcon from 'svgs/chevronDown.svg';
import userIcon from 'svgs/user.svg';
import countryJPIcon from 'svgs/countries/ja_JP.svg';
import countryUSIcon from 'svgs/countries/en_US.svg';

import { StateType, ActionContentType } from 'reducers/types';
import { ToolbarProps } from './types';
import { ToolbarFlex, ToolbarButton, ToolbarDropdownContents } from './shared';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Toolbar = ({ user, setLanguage, directHasnew }: ToolbarProps) => {
  const [dropDown, setDropDown] = useState(false);
  const userBtnRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const hasnew = directHasnew;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node | null) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target as Node | null)
      ) {
        setDropDown(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <ToolbarFlex alignItems="center" justifyContent="center">
      <ToolbarFlex>
        <Link href="/" passHref>
          <ButtonTransparentA px={3} height={1} width={1} color="orange.9">
            <Img height="xs" src={logoInline} />
          </ButtonTransparentA>
        </Link>
        <ToolbarButton bg="orange.4" mr="1px">
          <Link href="/puzzles" passHref>
            <ButtonTransparentA height={1} width={1} color="orange.9">
              <FormattedMessage {...toolbarMessages.puzzle} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4" mr="1px">
          <Link href="/users" passHref>
            <ButtonTransparentA height={1} width={1} color="orange.9">
              <FormattedMessage {...toolbarMessages.users} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <ToolbarButton bg="orange.4" mr="1px">
          <ButtonTransparentA
            href="https://wiki3.jp/cindy-lat"
            target="_blank"
            height={1}
            width={1}
            color="orange.9"
          >
            <FormattedMessage {...toolbarMessages.wiki} />
          </ButtonTransparentA>
        </ToolbarButton>
        <ToolbarButton bg="orange.4" mr="1px">
          <Link href="/eula" passHref>
            <ButtonTransparentA height={1} width={1} color="orange.9">
              <FormattedMessage {...toolbarMessages.eula} />
            </ButtonTransparentA>
          </Link>
        </ToolbarButton>
        <Flex
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
          {({ ref }) => (
            <ToolbarButton
              ref={(r: HTMLDivElement | null) => {
                ref(r);
                userBtnRef.current = r;
              }}
              ml="auto"
              bg="orange.5"
            >
              <ButtonTransparentA
                style={{ position: 'relative' }}
                height={1}
                width={1}
                color="gray.1"
                onClick={() => setDropDown(!dropDown)}
              >
                {user.id ? (
                  user.nickname
                ) : (
                  <Img ml={2} mr={1} src={userIcon} height="xs" />
                )}
                <Img
                  pl={1}
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
            <Popper placement="bottom-end">
              {({ ref, style, placement }) => (
                <ToolbarDropdownContents
                  ref={(r: HTMLDivElement | null) => {
                    ref(r);
                    dropDownRef.current = r;
                  }}
                  style={{
                    ...style,
                    top: undefined,
                  }}
                  data-placement={placement}
                >
                  {user.id && (
                    <ToolbarButton
                      bg="orange.5"
                      color="gray.1"
                      fontWeight="bold"
                    >
                      <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                        <ButtonTransparentA
                          height={1}
                          width={1}
                          color="gray.1"
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
                      bg="orange.5"
                      color="gray.1"
                      fontWeight="bold"
                    >
                      <MessageBoxButton />
                      {directHasnew && <RedDot right={20} top={8} />}
                    </ToolbarButton>
                  )}
                  {user.id && (
                    <ToolbarButton
                      bg="orange.5"
                      color="gray.1"
                      fontWeight="bold"
                    >
                      <LogoutButton />
                    </ToolbarButton>
                  )}
                  {!user.id && (
                    <ToolbarButton
                      bg="orange.5"
                      color="gray.1"
                      fontWeight="bold"
                    >
                      <LoginButton />
                    </ToolbarButton>
                  )}
                  {!user.id && (
                    <ToolbarButton bg="orange.5" color="gray.1">
                      <SignupButton />
                    </ToolbarButton>
                  )}
                  <ToolbarButton bg="orange.5" color="gray.1">
                    <SettingsButton />
                  </ToolbarButton>
                  <ToolbarButton bg="orange.5" color="gray.1">
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

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(Toolbar);
