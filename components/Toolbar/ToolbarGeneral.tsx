import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';
import userMessages from 'messages/components/user';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Portal } from 'react-portal';
import { Manager, Reference, Popper } from 'react-popper';
import { ButtonTransparent, Img } from 'components/General';
import LoginButton from './Login/LoginButton';
import LoginModal from './Login/LoginModal';
import LogoutButton from './LogoutButton';
import SignupButton from './Signup/SignupButton';
import SignupModal from './Signup/SignupModal';
import logoInline from 'svgs/logoInline.svg';
import chevronUpIcon from 'svgs/chevronUp.svg';
import chevronDownIcon from 'svgs/chevronDown.svg';
import userIcon from 'svgs/user.svg';
import gearIcon from 'svgs/gear.svg';
import countryJPIcon from 'svgs/countries/ja_JP.svg';
import countryUSIcon from 'svgs/countries/en_US.svg';

import { StateType, ActionContentType } from 'reducers/types';
import { ToolbarProps } from './types';
import { ToolbarFlex, ToolbarButton, ToolbarDropdownContents } from './shared';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Toolbar = ({ user, setLanguage }: ToolbarProps) => {
  const [dropDown, setDropDown] = useState(false);
  const userBtnRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

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
                  width="xxs"
                />
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
                    <ButtonTransparent
                      height={1}
                      width={1}
                      color="gray.1"
                      onClick={() => setDropDown(!dropDown)}
                    >
                      <Img mr={1} src={gearIcon} height="xs" />
                      <FormattedMessage {...toolbarMessages.settings} />
                    </ButtonTransparent>
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
      <LoginModal />
      <SignupModal />
    </ToolbarFlex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setLanguage: (lang: string) =>
    dispatch(globalReducer.actions.setLanguage(lang)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(Toolbar);
