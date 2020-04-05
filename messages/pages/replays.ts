import { defineMessages } from 'react-intl';

const scope = 'replays';

export const replaysPageMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzle Replays',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Replay old puzzles, as many times as you want',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Replays',
  },
});

export default replaysPageMessages;
