import styled from 'theme/styled';
import { ToolbarBoxBaseProps, ToolbarBoxProps } from './types';
import React from 'react';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { StateType, ToolbarResponsiveMenuType } from 'reducers/types';

const ToolbarBoxBase = styled.nav<ToolbarBoxBaseProps>`
  position: fixed;
  top: 0;
  left: calc(${p => p.theme.sizes.chatXL});
  height: ${p => p.theme.sizes.toolbar};
  width: ${p => `calc(100% - ${p.theme.sizes.chatXL} - 4px)`};
  background: ${p => p.theme.colors.preset.menubar.bg};
  border: 2px solid ${p => p.theme.colors.preset.menubar.bg};
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 100;
  transition-property: transform, visibility;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  ${p => p.theme.mediaQueries.large} {
    left: calc(${p => p.theme.sizes.chatLG});
    width: ${p => `calc(100% - ${p.theme.sizes.chatLG} - 4px)`};
  }
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
    width: calc(100% - 4px);
  }
  ${p => p.theme.mediaQueries.small} {
    visibility: ${p => (p.show ? 'visible' : 'hidden')};
    transform: ${p => (p.show ? 'none' : 'translateY(-100%)')};
  }
`;

class ToolbarBox extends React.Component<ToolbarBoxProps> {
  state = {
    showToolbar: true,
  };
  lastScrollTop = process.browser
    ? window.pageYOffset || document.documentElement.scrollTop
    : 0;
  handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > this.lastScrollTop && scrollY > 50) {
      this.state.showToolbar === true && this.setState({ showToolbar: false });
    } else {
      this.state.showToolbar === false && this.setState({ showToolbar: true });
    }
    this.lastScrollTop = scrollY <= 0 ? 0 : scrollY;
  };
  componentDidMount = () => {
    process.browser && window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    process.browser && window.removeEventListener('scroll', this.handleScroll);
  };
  render() {
    return (
      <ToolbarBoxBase
        show={
          this.state.showToolbar ||
          this.props.toolbarMenu !== ToolbarResponsiveMenuType.NULL
        }
      >
        {this.props.children}
      </ToolbarBoxBase>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  toolbarMenu: globalReducer.rootSelector(state).toolbarMenu,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ToolbarBox);
