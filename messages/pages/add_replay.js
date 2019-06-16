import { defineMessages } from 'react-intl';

const scope = 'add_replay';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Replay Create Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Create replay from puzzle in Cindy!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Create Replay',
  },
});

export default messages;
