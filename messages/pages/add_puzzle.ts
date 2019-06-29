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
  publishPuzzle: {
    id: `${scope}.publishPuzzle`,
    defaultMessage: 'Publish this puzzle',
  },
  emptyTitle: {
    id: `${scope}.emptyTitle`,
    defaultMessage: 'Title is empty!',
  },
  emptyContent: {
    id: `${scope}.emptyContent`,
    defaultMessage: 'Content is empty!',
  },
  emptySolution: {
    id: `${scope}.emptySolution`,
    defaultMessage: 'Solution is empty!',
  },
});

export default messages;
