import { defineMessages } from 'react-intl';

const scope = 'replay';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Replay Puzzle {puzzleTitle} | Cindy',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Replay Puzzle {puzzleTitle} in Cindy',
  },
});

export default messages;
