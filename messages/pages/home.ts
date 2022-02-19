import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: `home.title`,
    defaultMessage: 'Cindy: A lateral thinking salon for every one!',
  },
  description: {
    id: `home.description`,
    defaultMessage:
      'Find interesting lateral thinking puzzles here, share with your friends, and even create your own lateral thinking puzzle in minites!',
  },
  header: {
    id: `home.header`,
    defaultMessage: 'Welcome to {cindy}!',
  },
  body: {
    id: `home.body`,
    defaultMessage:
      'Cindy is an active community for chatting lateral thinking problems.',
  },
  start: {
    id: `home.start`,
    defaultMessage: 'Start',
  },
  bestPuzzleOfLastMonth: {
    id: `home.bestPuzzleOfLastMonth`,
    defaultMessage: 'Most Valuable Puzzles of the Last Month',
  },
});

export default messages;
