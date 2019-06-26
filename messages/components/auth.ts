import { defineMessages } from 'react-intl';

const scope = 'auth';

export const messages = defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Signup',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  nickname: {
    id: `${scope}.nickname`,
    defaultMessage: 'Nickname',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
});

export default messages;
