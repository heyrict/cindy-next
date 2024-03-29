import React from 'react';
import styled from 'theme/styled';
import { Button } from 'components/General';
import { FixedButtonProps, FixedButtonBaseProps } from './types';

const FixedButtonBase = styled(Button)<FixedButtonBaseProps>`
  display: none;
  border-width: 0;
  ${p => p.theme.mediaQueries.medium} {
    display: block;
    position: fixed;
    border-radius: 9999px;
    width: 5em;
    height: 5em;
    ${p => p.position || 'left'}: 2em;
    bottom: ${p => p.bottom || '2em'};
    background-color: ${p => p.theme.colors.preset.chatbutton.normal};
    z-index: 180;
    visibility: ${p => (p.show ? 'visible' : 'hidden')};
    transform: ${p => (p.show ? 'none' : 'translateX(-100%)')};
    transition-property: transform, opacity, visibility;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;

    &:active,
    &:hover {
      background-color: ${p => p.theme.colors.preset.chatbutton.hover};
    }
  }
`;

class FixedButton extends React.Component<FixedButtonProps> {
  state = {
    showButton: true,
  };
  lastScrollTop = process.browser
    ? window.pageYOffset || document.documentElement.scrollTop
    : 0;
  handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > this.lastScrollTop && scrollY > 50) {
      this.state.showButton === true && this.setState({ showButton: false });
    } else {
      this.state.showButton === false && this.setState({ showButton: true });
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
    const { children, ...buttonProps } = this.props;
    return (
      <FixedButtonBase show={this.state.showButton} {...buttonProps}>
        {this.props.children}
      </FixedButtonBase>
    );
  }
}

export default FixedButton;
