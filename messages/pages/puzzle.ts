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
  putSolutionLongtermYamiConfirm: {
    id: `${scope}.putSolutionLongtermYamiConfirm`,
    defaultMessage:
      'You attempt to put solution. Everyone can see your solution then. This operation cannot be reverted. Continue?',
  },
  putSolutionConfirm: {
    id: `${scope}.putSolutionConfirm`,
    defaultMessage:
      'You attempt to put solution. Everyone can see your solution then and you cannot edit the solution any more. This operation cannot be reverted. Continue?',
  },
  setHidden: {
    id: `${scope}.setHidden`,
    defaultMessage: 'Make the puzzle hidden to public',
  },
  setHiddenConfirm: {
    id: `${scope}.setHiddenConfirm`,
    defaultMessage:
      'You attempt to set the puzzle hidden to public. This operation will forcefully solve the puzzle and mark it as solved. You will NOT be able to change the puzzle to undergoing state. Continue?',
  },
  unsetHidden: {
    id: `${scope}.unsetHidden`,
    defaultMessage: 'Make the puzzle open to public',
  },
  unsetHiddenConfirm: {
    id: `${scope}.unsetHiddenConfirm`,
    defaultMessage:
      'You attempt to set the puzzle open to public. This operation will mark the puzzle as solved and anyone viewing this page will see the puzzle contents and solution INSTANTLY. You can make this puzzle hidden again afterwards. Continue?',
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
  goToPuzzlePage: {
    id: `${scope}.goToPuzzlePage`,
    defaultMessage: 'Go To Puzzle Page',
  },
  deleteTagConfirm: {
    id: `${scope}.deleteTagConfirm`,
    defaultMessage:
      'Your are going to delete this tag "{tag}". This operation cannot be reverted. Are you sure?',
  },
  deleteImageConfirm: {
    id: `${scope}.deleteImageConfirm`,
    defaultMessage: 'Your are attempting to delete this image. Continue?',
  },
});

export default messages;
