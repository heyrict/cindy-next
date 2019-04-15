import { Container } from 'unstated';

class OnlyShowContainer extends Container {
  state = {
    show: false,
  };
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
