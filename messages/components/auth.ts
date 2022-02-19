import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  login: {
    id: `auth.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `auth.logout`,
    defaultMessage: 'Logout',
  },
  signup: {
    id: `auth.signup`,
    defaultMessage: 'Signup',
  },
  username: {
    id: `auth.username`,
    defaultMessage: 'Username',
  },
  nickname: {
    id: `auth.nickname`,
    defaultMessage: 'Nickname',
  },
  password: {
    id: `auth.password`,
    defaultMessage: 'Password',
  },
  lastLogin: {
    id: `auth.lastLogin`,
    defaultMessage: 'Last Login',
  },
  dateJoined: {
    id: `auth.dateJoined`,
    defaultMessage: 'Date Joined',
  },
});

export default messages;
