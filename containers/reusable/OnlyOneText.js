import { Container } from 'unstated';

class OnlyOneTextContainer extends Container {
  state = {
    content: '',
  };
  handleChange = content => {
    this.setState({ content });
  };
}

export default OnlyOneTextContainer;
