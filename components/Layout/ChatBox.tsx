import React from 'react';
import styled from 'theme/styled';
import { Img } from 'components/General';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

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
  top: 0;
  left: 0;
  overflow: hidden;
  flex-shrink: 0;
  border-right: 2px solid ${p => p.theme.colors.orange[5]};
  height: 100%;
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

const ChatBox = ({
  children,
  aside,
  setTrueAside,
  setFalseAside,
}: ChatBoxProps) => (
  <div>
    <ResponsiveChatBox open={aside}>{children}</ResponsiveChatBox>
    <ChatBoxShader open={aside} onClick={() => setFalseAside()} />
    <FixedButton
      position="left"
      chatOpen={aside}
      onClick={() => setTrueAside()}
    >
      <Img height="3em" src={ChatIcon} />
    </FixedButton>
  </div>
);

const mapStateToProps = (state: StateType) => ({
  aside: globalReducer.rootSelector(state).aside,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueAside: () => dispatch(globalReducer.actions.setTrueAside()),
  setFalseAside: () => dispatch(globalReducer.actions.setFalseAside()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatBox);