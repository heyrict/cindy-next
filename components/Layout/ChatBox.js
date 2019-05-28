import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button, Img } from 'components/General';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import ChatIcon from 'svgs/chat.svg';

const FixedButton = styled(Button)`
  display: none;
  border-width: 0;
  ${p => p.theme.mediaQueries.medium} {
    display: block;
    position: fixed;
    border-radius: 9999px;
    width: 5em;
    height: 5em;
    left: 2em;
    bottom: 2em;
    background-color: ${p => p.theme.colors.red[9]};
    color: ${p => p.theme.colors.gray[8]};
    z-index: 180;
  }
`;

const ChatBoxShader = styled.div`
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
  width: ${p => p.theme.sizes.chat};
  overflow: hidden;
  flex-shrink: 0;
  border-right: 2px solid ${p => p.theme.colors.orange[5]};
  height: 100%;
  z-index: 200;
`;

const ResponsiveChatBox = styled(ChatBoxBase)`
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

const ChatBox = ({ children, aside, setTrueAside, setFalseAside }) => (
  <div>
    <ResponsiveChatBox open={aside}>{children}</ResponsiveChatBox>
    <ChatBoxShader open={aside} onClick={() => setFalseAside()} />
    <FixedButton chatOpen={aside} onClick={() => setTrueAside()}>
      <Img size="3em" src={ChatIcon} />
    </FixedButton>
  </div>
);

ChatBox.propTypes = {
  children: PropTypes.node,
  aside: PropTypes.bool.isRequired,
  setTrueAside: PropTypes.func.isRequired,
  setFalseAside: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  aside: globalReducer.rootSelector(state).aside,
});

const mapDispatchToProps = dispatch => ({
  setTrueAside: () => dispatch(globalReducer.actions.setTrueAside()),
  setFalseAside: () => dispatch(globalReducer.actions.setFalseAside()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChatBox);
