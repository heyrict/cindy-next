import { Container } from 'unstated';

class OnlyShowContainer extends Container {
  constructor(props = {}) {
    super(props);
    this.state = {
      show: props.show || false,
    };
  }
  toggle() {
    this.setState(p => ({ show: !p.show }));
  }
  show() {
    this.setState({ show: true });
  }
  hide() {
    this.setState({ show: false });
  }
}

export default OnlyShowContainer;
