import { defineMessages } from 'react-intl';

const scope = 'users';

export const usersMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Users Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Recently registered users in Cindy',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Users',
  },
});

export default usersMessages;
