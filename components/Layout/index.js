/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import { Global, css } from '@emotion/core';

import Chat from 'components/Chat';
import Toolbar from 'components/Toolbar';
import ChatBox from './ChatBox';
import Page from './Page';
import ToolbarBox from './ToolbarBox';

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

const globalStyle = theme => css`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-size: ${theme.fontSizes[1]}px;
    line-height: 1.4;
    overscroll-behavior: contain;
    background-color: ${theme.colors.white};
    color: ${theme.colors.aizumicha};
  }
  a {
    text-decoration: none;
    color: ${theme.colors.chisuga};
  }
  a,
  button {
    cursor: pointer;
  }
  button {
    border: none;
    padding: 0.2em;
  }
  ${tabsStyle}
`;

const Layout = ({ children, ...props }) => {
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

export default Layout;
