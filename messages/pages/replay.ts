import { defineMessages } from 'react-intl';

const scope = 'replay';

export const replayPageMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzle Replay',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Replay Puzzle in Cindy',
  },
  notExistDescription: {
    id: `${scope}.notExistDescription`,
    defaultMessage: 'This replay does not exist!',
  },
});

export default replayPageMessages;
