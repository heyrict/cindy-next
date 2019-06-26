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
  notExistDescription: {
    id: `${scope}.notExistDescription`,
    defaultMessage: 'This puzzle does not exist!',
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
  putQuestion: {
    id: `${scope}.putQuestion`,
    defaultMessage: 'Ask',
  },
  waitForAnswer: {
    id: `${scope}.waitForAnswer`,
    defaultMessage: 'Wait for answer...',
  },
  putSolution: {
    id: `${scope}.putSolution`,
    defaultMessage: 'Put Solution',
  },
  setHidden: {
    id: `${scope}.setHidden`,
    defaultMessage: 'Set As Hidden',
  },
  memoFromCreator: {
    id: `${scope}.memoFromCreator`,
    defaultMessage: 'Memo from creator',
  },
});

export default messages;
