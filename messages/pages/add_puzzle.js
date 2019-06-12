import { defineMessages } from 'react-intl';

const scope = 'add_puzzle';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzle Create Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Create puzzles in Cindy!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Create Puzzle',
  },
});

export default messages;
