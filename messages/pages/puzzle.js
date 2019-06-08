import { defineMessages } from 'react-intl';

const scope = 'puzzle';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Puzzle Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Details of puzzle',
  },
  solveit: {
    id: `${scope}.solveit`,
    defaultMessage: 'Can you solve the puzzle?',
  },
  creator: {
    id: `${scope}.creator`,
    defaultMessage: 'Creator',
  },
  hiddenContents: {
    id: `${scope}.hiddenContents`,
    defaultMessage: 'This puzzle is not open to public access.',
  },
  forbiddenContents: {
    id: `${scope}.forbiddenContents`,
    defaultMessage:
      'This puzzle has violated rules in Cindy and is forbidden by administrator.',
  },
});

export default messages;
