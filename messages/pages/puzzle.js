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
});

export default messages;
