import { defineMessages } from 'react-intl';

const scope = 'search';

export const searchMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Search old puzzles',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Search old puzzles in Cindy',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Search Puzzles',
  },
});

export default searchMessages;
