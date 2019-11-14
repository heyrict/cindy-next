/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Global, css } from '@emotion/core';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { requestNotificationPermission } from 'common/web-notify';

import { FormattedMessage } from 'react-intl';
import webNotifyMessages from 'messages/webNotify';
import commonMessages from 'messages/common';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Chat from 'components/Chat';
import { ChannelAsideProps } from 'components/Chat/ChannelAside/types';
import Toolbar from 'components/Toolbar';
import PuzzleRightAside from 'components/Puzzle/RightAside';
import AwardChecker from 'components/AwardChecker';
import ChatBox from './ChatBox';
import Page from './Page';
import ToolbarBox from './ToolbarBox';
import Footer from './Footer';
import Patrons from './Patrons';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';

import theme from 'theme/theme';
import { LayoutProps } from './types';
import { NotificationPermissionType } from 'common/types';
import { StateType, ActionContentType } from 'reducers/types';

const ChannelAside = dynamic<Pick<ChannelAsideProps, never>>(
  () => import('components/Chat/ChannelAside').then(mod => mod.default),
  { ssr: false },
);

const tabsStyle = css`
  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .nav::before,
  .nav::after {
    display: table;
    clear: both;
  }
  .nav-tabs {
    border-bottom: 1px solid #ddd;
    display: inline-table;
  }
  .nav-tabs > li {
    float: left;
    margin-bottom: -1px;
  }
  .nav > li {
    position: relative;
    display: block;
  }
  .nav > li > a {
    position: relative;
    display: block;
    padding: 0.3em 1em;
  }
  .nav-tabs > li > a {
    margin-right: 2px;
    line-height: 1.428571;
    border-radius: 4px 4px 0 0;
    border: 1px solid transparent;
  }
  .nav-tabs > li.active > a,
  .nav-tabs > li.active > a:focus,
  .nav-tabs > li.active > a:hover {
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
  }
  .tab-content > .tab-pane {
    display: none;
  }
  .tab-content > .active {
    display: block;
  }
`;

const stampStyle = css`
  .cindy-stamp-middle {
    height: 4em;
    vertical-align: middle;
  }

  .cindy-frame-icon {
    display: inline-block;
    float: left;
    margin: 0 5px;
  }
`;

const toastifyStyle = css`
  .Toastify__toast-container {
    z-index: 800;
    -webkit-transform: translate3d(0, 0, 9999px);
    position: fixed;
    padding: 0;
    width: 320px;
    box-sizing: border-box;
    color: ${theme.colors.white};
    bottom: 1em;
    right: 1em;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
      bottom: 0;
    }
  }

  .Toastify__toast {
    position: relative;
    min-height: 48px;
    box-sizing: border-box;
    padding: 4px;
    border-radius: 1px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
      0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    font-family: sans-serif;
    direction: ltr;
  }
  .Toastify__toast--default {
    background: ${theme.colors.orange[6]};
    color: ${theme.colors.white};
  }
  .Toastify__toast--info {
    background: ${theme.colors.cyan[6]};
  }
  .Toastify__toast--success {
    background: ${theme.colors.green[6]};
  }
  .Toastify__toast--warning {
    background: ${theme.colors.red[6]};
  }
  .Toastify__toast--error {
    background: ${theme.colors.pink[6]};
  }
  .Toastify__toast-body {
    margin: auto 0;
    -ms-flex: 1;
    flex: 1;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
    }
  }

  .Toastify__close-button {
    color: ${theme.colors.white};
    font-weight: bold;
    font-size: 14px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    -ms-flex-item-align: start;
    align-self: flex-start;
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }

  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 9999;
    opacity: 0.7;
    background-color: rgba(255, 255, 255, 0.7);
    transform-origin: left;
  }
  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }
  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }

  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0);
    }
  }

  .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }
  .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }
`;

const tableStyle = css`
  table {
    border-collapse: collapse;
    text-align: left;
  }
  table tbody {
    border: 1px solid ${theme.colors.gray[7]};
  }
  table td,
  table th {
    padding: ${theme.space[1]}px ${theme.space[2]}px;
  }
  table thead th {
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.05, ${theme.colors.gray[5]}),
      color-stop(1, ${theme.colors.gray[8]})
    );
    background: -moz-linear-gradient(
      center top,
      ${theme.colors.gray[5]} 5%,
      ${theme.colors.gray[8]} 100%
    );
    background-color: ${theme.colors.gray[5]};
    color: ${theme.colors.gray[1]};
    border-left: 1px solid ${theme.colors.gray[3]};
  }
  table thead th:first-child {
    border: none;
  }
  table tbody td {
    color: ${theme.colors.gray[7]};
    border-left: 1px solid ${theme.colors.gray[2]};
    border-bottom: 1px solid ${theme.colors.gray[2]};
  }
  table tbody .alt td {
    background: ${theme.colors.gray[1]};
    color: ${theme.colors.gray[8]};
  }
  table tbody td:first-child {
    border-left: none;
  }
  table tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const globalStyle = css`
  @font-face {
    font-family: 'DejaVu Sans';
    src: url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.eot');
    src: url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.eot?#iefix')
        format('embedded-opentype'),
      url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.woff2')
        format('woff2'),
      url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.woff')
        format('woff'),
      url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.ttf')
        format('truetype'),
      url('//db.onlinewebfonts.com/t/60376796f383e61ee182772be6ca20a9.svg#DejaVu Sans')
        format('svg');
  }
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-size: ${theme.fontSizes[1]}px;
    font-family: DejaVu Sans, Sans serif, sans, arial;
    line-height: 1.4;
    overscroll-behavior: contain;
    background-color: ${theme.colors.solarized.white};
    color: ${theme.colors.solarized.black};
  }
  a {
    text-decoration: none;
    color: ${theme.colors.blue[6]};
  }
  a,
  button {
    cursor: pointer;
  }
  button {
    border: none;
    padding: 0.2em;
  }
  pre,
  code {
    padding: 2px 5px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
  }
  pre > code {
    padding: 0;
    background: transparent;
    overflow-x: 'auto';
  }
  blockquote {
    padding: 5px;
    margin: 1em 0;
    border-left: 6px solid ${theme.colors.gray[2]};
    background: ${theme.colors.gray[1]};
  }
  ${tabsStyle}
  ${stampStyle}
  ${toastifyStyle}
  ${tableStyle}
`;

const Layout = ({
  children,
  appInit,
  route,
  pushNotification,
  setFalsePushNotification,
}: LayoutProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);
  const waitPushHdlRef = useRef<number | null>(null);

  useEffect(() => {
    appInit();
  }, []);

  // Request notification permission
  useEffect(() => {
    if (waitPushHdlRef.current) window.clearTimeout(waitPushHdlRef.current);
    waitPushHdlRef.current = window.setTimeout(() => {
      if (pushNotification)
        requestNotificationPermission().then(permission => {
          if (permission === NotificationPermissionType.NOT_SUPPORTED) {
            notifHdlRef.current = toast.info(
              <Box>
                <FormattedMessage {...webNotifyMessages.notSupportedMessage} />
                <Flex mt={2} width={1}>
                  <Box width={1} bg="green.6" borderRadius={1}>
                    <ButtonTransparent
                      height={1}
                      width={1}
                      py={2}
                      color="green.1"
                      onClick={() => requestNotificationPermission()}
                    >
                      <FormattedMessage {...commonMessages.enable} />
                    </ButtonTransparent>
                  </Box>
                  <Box width={1} bg="pink.6" borderRadius={1}>
                    <ButtonTransparent
                      height={1}
                      width={1}
                      py={2}
                      color="pink.1"
                      onClick={() => {
                        setFalsePushNotification();
                        if (notifHdlRef.current)
                          toast.dismiss(notifHdlRef.current);
                      }}
                    >
                      <FormattedMessage {...commonMessages.doNotNotifyAgain} />
                    </ButtonTransparent>
                  </Box>
                </Flex>
              </Box>,
            );
          } else if (
            permission === NotificationPermissionType.DENIED ||
            permission === NotificationPermissionType.DEFAULT
          ) {
            notifHdlRef.current = toast.info(
              <Box>
                <FormattedMessage {...webNotifyMessages.deniedMessage} />
                <Box width={1} mt={2} bg="pink.6">
                  <ButtonTransparent
                    height={1}
                    width={1}
                    py={2}
                    color="pink.1"
                    onClick={() => {
                      setFalsePushNotification();
                      if (notifHdlRef.current)
                        toast.dismiss(notifHdlRef.current);
                    }}
                  >
                    <FormattedMessage {...commonMessages.doNotNotifyAgain} />
                  </ButtonTransparent>
                </Box>
              </Box>,
            );
          }
        });
    }, 5000);
  }, [pushNotification]);

  const isChannelPage = route.startsWith('/channel');

  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      <ChatBox>{isChannelPage ? <ChannelAside /> : <Chat />}</ChatBox>
      <PuzzleRightAside />
      <ToolbarBox>
        <Toolbar />
      </ToolbarBox>
      <Page>
        {children}
        {!isChannelPage && (
          <Footer>
            <Patrons />
          </Footer>
        )}
      </Page>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        transition={Slide}
        autoClose={8000}
        closeOnClick={false}
        draggable
      />
      <AwardChecker />
      <div id="portal-dest" />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  pushNotification: settingReducer.rootSelector(state).pushNotification,
  route: globalReducer.rootSelector(state).route,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  appInit: () => dispatch(globalReducer.actions.appInit()),
  setFalsePushNotification: () =>
    dispatch(settingReducer.actions.pushNotification.setFalse()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(Layout);
