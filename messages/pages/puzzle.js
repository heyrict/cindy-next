import { defineMessages } from 'react-intl';

const scope = 'puzzle';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzles',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Playing lateral thinking puzzles online, and browsering all kinds of lateral thinking puzzles. Tons of lateral thinking puzzles are waiting for you!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Puzzle List',
  },
  newPuzzle: {
    id: `${scope}.newPuzzle`,
    defaultMessage: 'New puzzle',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
});

export default messages;
