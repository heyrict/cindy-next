import { Container } from 'unstated';
import cookie from 'cookie';

class AuthContainer extends Container {
  state = {
    user: {},
  };
  constructor() {
    super();
    if (process.browser && document.cookie) {
      const authToken = cookie.parse(document.cookie)['cindy-jwt-token'];
      if (authToken) {
        fetch('/webhook/getcurrent', {
          credentials: 'same-origin',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (!res.errors) {
              this.auth({
                id: res.id,
                nickname: res.nickname,
                username: res.username,
              });
            } else {
              console.log('Error in AuthContainer:', res.errors);
            }
            return res;
          });
      }
    }
  }
  auth = user => {
    this.setState({ user });
  };
  deauth = () => {
    this.setState({ user: {} });
  };
}

export default new AuthContainer();
