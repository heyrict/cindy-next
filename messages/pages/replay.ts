import { defineMessages } from 'react-intl';

export const replayPageMessages = defineMessages({
  title: {
    id: `replay.title`,
    defaultMessage: 'Puzzle Replay',
  },
  description: {
    id: `replay.description`,
    defaultMessage: 'Replay Puzzle in Cindy',
  },
  notExistDescription: {
    id: `replay.notExistDescription`,
    defaultMessage: 'This replay does not exist!',
  },
  puzzleNotSolved: {
    id: `replay.puzzleNotSolved`,
    defaultMessage: 'You cannot create a replay out of an unsolved puzzle!',
  },
});

export default replayPageMessages;
