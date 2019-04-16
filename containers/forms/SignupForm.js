import { Container } from 'unstated';

class SignupFormContainer extends Container {
  state = {
    nickname: '',
    username: '',
    password: '',
    errors: [],
  };
  handleNicknameChange = content => {
    this.setState({ nickname: content });
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
      nickname: '',
      username: '',
      password: '',
      errors: '',
    });
  };
}

export default SignupFormContainer;
