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
  puzzleNotSolved: {
    id: `${scope}.puzzleNotSolved`,
    defaultMessage: 'You cannot create a replay out of an unsolved puzzle!',
  },
});

export default replayPageMessages;
