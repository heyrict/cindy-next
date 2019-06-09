/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import React, { useEffect } from 'react';
import { Global, css } from '@emotion/core';

import Chat from 'components/Chat';
import Toolbar from 'components/Toolbar';
import ChatBox from './ChatBox';
import Page from './Page';
import ToolbarBox from './ToolbarBox';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

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
    padding: 10px 15px;
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
  }

  .cindy-frame-icon {
    display: inline-block;
    float: left;
    margin: 0 5px;
  }
`;

const globalStyle = theme => css`
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
    background: transparent;
  }
  ${tabsStyle}
  ${stampStyle}
`;

const Layout = ({ children, fetchUser, ...props }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Global styles={globalStyle} />
      <ChatBox>
        <Chat />
      </ChatBox>
      <ToolbarBox>
        <Toolbar />
      </ToolbarBox>
      <Page>{children}</Page>
    </div>
  );
};

const withRedux = connect(
  null,
  dispatch => ({
    fetchUser: () => dispatch(globalReducer.actions.fetchUser()),
  }),
);

export default withRedux(Layout);
