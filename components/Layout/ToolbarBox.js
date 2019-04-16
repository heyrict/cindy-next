import styled from '@emotion/styled';

const ToolbarBoxBase = styled.nav`
  position: fixed;
  top: 0;
  left: calc(${p => p.theme.sizes.chat});
  height: ${p => p.theme.sizes.toolbar};
  width: ${p => `calc(100% - ${p.theme.sizes.chat} - 4px)`};
  background-color: ${p => p.theme.colors.white};
  border: 2px solid ${p => p.theme.colors.edocha};
  overflow-x: auto;
  overflow-y: hidden;
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
  transition-property: transform, visibility;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  transform: ${p => (p.show ? 'none' : 'translateY(-100%)')};
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
    width: 100%;
  }
`;

class ToolbarBox extends React.Component {
  state = {
    showToolbar: true,
  };
  lastScrollTop = process.browser
    ? window.pageYOffset || document.documentElement.scrollTop
    : 0;
  handleScroll = e => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > this.lastScrollTop && scrollY > 50) {
      this.setState({ showToolbar: false });
    } else {
      this.setState({ showToolbar: true });
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
      <ToolbarBoxBase show={this.state.showToolbar}>
        {this.props.children}
      </ToolbarBoxBase>
    );
  }
}

export default ToolbarBox;
