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
  order_bookmarkCount: {
    id: `${scope}.order_bookmarkCount`,
    defaultMessage: 'Bookmark Count',
  },
  order_commentCount: {
    id: `${scope}.order_commentCount`,
    defaultMessage: 'Comment Count',
  },
  order_starCount: {
    id: `${scope}.order_starCount`,
    defaultMessage: 'Star Count',
  },
  order_starSum: {
    id: `${scope}.order_starSum`,
    defaultMessage: 'Star Sum',
  },
});

export default searchMessages;
