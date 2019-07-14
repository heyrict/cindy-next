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
  last_login: {
    id: `${scope}.last_login`,
    defaultMessage: 'Last Login',
  },
  date_joined: {
    id: `${scope}.date_joined`,
    defaultMessage: 'Date Joined',
  },
});

export default messages;
