/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTheme, Global, css } from '@emotion/react';
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

import { connect, useDispatch, useSelector } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';

import { LayoutProps } from './types';
import { NotificationPermissionType } from 'common/types';
import { StateType, ActionContentType } from 'reducers/types';
import { ThemesEnum } from 'theme/types';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { ja } from 'date-fns/locale';

const ChannelAside = dynamic<Pick<ChannelAsideProps, never>>(
  () => import('components/Chat/ChannelAside').then(mod => mod.default),
  { ssr: false },
);

const Layout = ({ children }: LayoutProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);
  const waitPushHdlRef = useRef<number | null>(null);
  const theme = useTheme();

  const pushNotification = useSelector(
    (state: StateType) => settingReducer.rootSelector(state).pushNotification,
  );
  const route = useSelector(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );
  const dispatch = useDispatch<(action: ActionContentType) => void>();
  const setFalsePushNotification = () => {
    dispatch(settingReducer.actions.pushNotification.setFalse());
  };

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

  const isChannelPage = route.startsWith('/channel/');
  const isAdminPage = route.startsWith('/admin');

  const scrollbarStyle = css`
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 8px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 2.5px;
      background-color: ${theme.colorthemes.light.indigo[7]};
      -webkit-box-shadow: 0 0 1px ${theme.colorthemes.light.indigo[3]};
    }
  `;

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

  const tableStyle = css`
    table {
      border-collapse: collapse;
      border: 2px solid ${theme.colors.gray[7]};
    }
    table td,
    table th {
      padding: ${theme.space[1]}px ${theme.space[2]}px;
    }
    table thead th {
      background-color: ${theme.colors.gray[6]};
      color: ${theme.colors.gray[1]};
      border-left: 1px solid ${theme.colors.gray[3]};
    }
    table tbody td {
      color: ${theme.colors.gray[7]};
      border-left: 1px solid ${theme.colors.gray[5]};
      border-bottom: 1px solid ${theme.colors.gray[5]};
    }
    table tbody tr:nth-child(even) {
      background-color: ${theme.colors.gray[0]};
      color: ${theme.colors.gray[8]};
    }
    table tbody td:first-of-type {
      border-left: none;
    }
    table tbody tr:last-of-type td {
      border-bottom: none;
    }
  `;

  const globalStyle = css`
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
    html {
      min-height: 100%;
    }
    body,
    div#__next {
      min-height: calc(100vh - ${theme.sizes.toolbar});
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
  ${tableStyle}
  ${scrollbarStyle}
  `;

  return isAdminPage ? (
    <>
      <Box flexGrow={1}>{children}</Box>
      <Footer>
        <Patrons />
      </Footer>
    </>
  ) : (
    <React.Fragment>
      <Global styles={globalStyle} />
      <ChatBox>{isChannelPage ? <ChannelAside /> : <Chat />}</ChatBox>
      <PuzzleRightAside />
      <ToolbarBox>
        <Toolbar />
      </ToolbarBox>
      <Page>
        <Box flexGrow={1}>{children}</Box>
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
        theme={theme.theme == ThemesEnum.DARK ? 'dark' : 'light'}
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
  setFalsePushNotification: () =>
    dispatch(settingReducer.actions.pushNotification.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Layout);
