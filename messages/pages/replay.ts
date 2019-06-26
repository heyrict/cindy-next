import { defineMessages } from 'react-intl';

const scope = 'replay';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzle Replay',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Replay Puzzle in Cindy',
  },
});

export default messages;
