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
    defaultMessage: 'Make the puzzle hidden to public',
  },
  unsetHidden: {
    id: `${scope}.unsetHidden`,
    defaultMessage: 'Make the puzzle open to public',
  },
  memoFromCreator: {
    id: `${scope}.memoFromCreator`,
    defaultMessage: 'Memo from creator',
  },
  setGrotesque: {
    id: `${scope}.setGrotesque`,
    defaultMessage: 'Show grotesque warning',
  },
  unsetGrotesque: {
    id: `${scope}.unsetGrotesque`,
    defaultMessage: 'Hide grotesque warning',
  },
  setYami: {
    id: `${scope}.setYami`,
    defaultMessage: 'Make this puzzle yami',
  },
  unsetYami: {
    id: `${scope}.unsetYami`,
    defaultMessage: 'Make this puzzle non-yami',
  },
  grotesqueWarning: {
    id: `${scope}.grotesqueWarning`,
    defaultMessage: 'WARNING! This puzzle has grotesque descriptions',
  },
});

export default messages;
