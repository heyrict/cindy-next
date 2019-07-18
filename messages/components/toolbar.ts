import { defineMessages } from 'react-intl';

const scope = 'toolbar';

export const messages = defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  puzzle: {
    id: `${scope}.puzzle`,
    defaultMessage: 'Puzzle',
  },
  wiki: {
    id: `${scope}.wiki`,
    defaultMessage: 'Wiki',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
});

export default messages;
