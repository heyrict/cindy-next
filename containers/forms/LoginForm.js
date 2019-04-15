import { Container } from 'unstated';

class LoginFormContainer extends Container {
  state = {
    username: '',
    password: '',
    errors: [],
  };
  handleUsernameChange = content => {
    this.setState({ username: content });
  };
  handlePasswordChange = content => {
    this.setState({ password: content });
  };
  setErrors = errors => {
    this.setState({ errors });
  };
  resetState = () => {
    this.setState({
      username: '',
      password: '',
      errors: '',
    });
  };
}

export default LoginFormContainer;
