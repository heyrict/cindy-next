/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import { Global, css } from '@emotion/core';

import Chat from 'components/Chat';
import Toolbar from 'components/Toolbar';
import ChatBox from './ChatBox';
import Page from './Page';
import ToolbarBox from './ToolbarBox';

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
