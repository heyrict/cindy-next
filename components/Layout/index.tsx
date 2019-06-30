/*
 * This is the global layout wrapping `Component` in nextjs _app.js.
 */

import React, { useEffect } from 'react';
import { Global, css } from '@emotion/core';
import { toast, ToastContainer, Slide } from 'react-toastify';

import Chat from 'components/Chat';
import Toolbar from 'components/Toolbar';
import PuzzleRightAside from 'components/Puzzle/RightAside';
import AwardChecker from 'components/AwardChecker';
import ChatBox from './ChatBox';
import Page from './Page';
import ToolbarBox from './ToolbarBox';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import theme from 'theme/theme';
import { LayoutProps } from './types';

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
  ${tabsStyle}
  ${stampStyle}
  ${toastifyStyle}
`;

const Layout = ({ children, fetchUser }: LayoutProps) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      <ChatBox>
        <Chat />
      </ChatBox>
      <PuzzleRightAside />
      <ToolbarBox>
        <Toolbar />
      </ToolbarBox>
      <Page>{children}</Page>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        transition={Slide}
        autoClose={8000}
        closeOnClick={false}
        draggable
      />
      <AwardChecker />
    </React.Fragment>
  );
};

const withRedux = connect(
  null,
  dispatch => ({
    fetchUser: () => dispatch(globalReducer.actions.fetchUser()),
  }),
);

export default withRedux(Layout);
