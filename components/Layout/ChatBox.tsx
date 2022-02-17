import React from 'react';
import styled from 'theme/styled';
import { Img, RedDot } from 'components/General';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import ChatIcon from 'svgs/chat.svg';
import FixedButton from './FixedButton';

import { ChatBoxInnerProps, ChatBoxProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const ChatBoxShader = styled.div<ChatBoxInnerProps>`
  display: none;
  ${p => p.theme.mediaQueries.medium} {
    display: ${p => (p.open ? 'flex' : 'none')};
    opacity: ${p => (p.open ? 1 : 0)};
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition-property: opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    z-index: 190;
  }
`;

const ChatBoxBase = styled.aside`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  flex-shrink: 0;
  flex-flow: column nowrap;
  border-right: 2px solid ${p => p.theme.colors.preset.menubar.bg};
  z-index: 200;
  width: ${p => p.theme.sizes.chatXL};
  ${p => p.theme.mediaQueries.large} {
    width: ${p => p.theme.sizes.chatLG};
  }
`;

const ResponsiveChatBox = styled(ChatBoxBase)<ChatBoxInnerProps>`
  ${p => p.theme.mediaQueries.medium} {
    width: 62%;
    background-color: ${p => p.theme.colors.solarized.white};
    opacity: ${p => (p.open ? 1 : 0)}
    visibility: ${p => (p.open ? 'visible' : 'hidden')};
    transform: ${p => (p.open ? 'none' : 'translateX(-100%)')};
    transition-property: transform, opacity, visibility;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }
  ${p => p.theme.mediaQueries.small} {
    width: 80%;
  }
`;

const isChannelPageSelector = createSelector(
  (state: StateType) => globalReducer.rootSelector(state).route,
  (route: string) => route.startsWith('/channel/'),
);

const ChatBox = ({
  children,
  aside,
  chatHasnew,
  isChannelPage,
  setTrueAside,
  setFalseAside,
}: ChatBoxProps) => (
  <React.Fragment>
    <ResponsiveChatBox open={aside}>{children}</ResponsiveChatBox>
    <ChatBoxShader open={aside} onClick={() => setFalseAside()} />
    {!isChannelPage && (
      <FixedButton position="left" onClick={() => setTrueAside()}>
        {chatHasnew && <RedDot size="xxs" right={10} />}
        <Img height="3em" src={ChatIcon} />
      </FixedButton>
    )}
  </React.Fragment>
);

const mapStateToProps = (state: StateType) => ({
  aside: globalReducer.rootSelector(state).aside,
  chatHasnew: chatReducer.rootSelector(state).chatHasnew,
  isChannelPage: isChannelPageSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueAside: () => dispatch(globalReducer.actions.aside.setTrue()),
  setFalseAside: () => dispatch(globalReducer.actions.aside.setFalse()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ChatBox);
