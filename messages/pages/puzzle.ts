import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: `puzzle.title`,
    defaultMessage: 'Puzzle Page',
  },
  description: {
    id: `puzzle.description`,
    defaultMessage: 'Details of puzzle',
  },
  notExistDescription: {
    id: `puzzle.notExistDescription`,
    defaultMessage: 'This puzzle does not exist!',
  },
  solveit: {
    id: `puzzle.solveit`,
    defaultMessage: 'Can you solve the puzzle?',
  },
  creator: {
    id: `puzzle.creator`,
    defaultMessage: 'Creator',
  },
  hiddenContents: {
    id: `puzzle.hiddenContents`,
    defaultMessage: 'This puzzle is not open to public access.',
  },
  forbiddenContents: {
    id: `puzzle.forbiddenContents`,
    defaultMessage:
      'This puzzle has violated rules in Cindy and is forbidden by administrator.',
  },
  putQuestion: {
    id: `puzzle.putQuestion`,
    defaultMessage: 'Ask',
  },
  waitForAnswer: {
    id: `puzzle.waitForAnswer`,
    defaultMessage: 'Wait for answer...',
  },
  putSolution: {
    id: `puzzle.putSolution`,
    defaultMessage: 'Put Solution',
  },
  putSolutionLongtermYamiConfirm: {
    id: `puzzle.putSolutionLongtermYamiConfirm`,
    defaultMessage:
      'You attempt to put solution. Everyone can see your solution then. This operation cannot be reverted. Continue?',
  },
  putSolutionConfirm: {
    id: `puzzle.putSolutionConfirm`,
    defaultMessage:
      'You attempt to put solution. Everyone can see your solution then and you cannot edit the solution any more. This operation cannot be reverted. Continue?',
  },
  setHidden: {
    id: `puzzle.setHidden`,
    defaultMessage: 'Make the puzzle hidden to public',
  },
  setHiddenConfirm: {
    id: `puzzle.setHiddenConfirm`,
    defaultMessage:
      'You attempt to set the puzzle hidden to public. This operation will forcefully solve the puzzle and mark it as solved. You will NOT be able to change the puzzle to undergoing state. Continue?',
  },
  unsetHidden: {
    id: `puzzle.unsetHidden`,
    defaultMessage: 'Make the puzzle open to public',
  },
  unsetHiddenConfirm: {
    id: `puzzle.unsetHiddenConfirm`,
    defaultMessage:
      'You attempt to set the puzzle open to public. This operation will mark the puzzle as solved and anyone viewing this page will see the puzzle contents and solution INSTANTLY. You can make this puzzle hidden again afterwards. Continue?',
  },
  memoFromCreator: {
    id: `puzzle.memoFromCreator`,
    defaultMessage: 'Memo from creator',
  },
  setGrotesque: {
    id: `puzzle.setGrotesque`,
    defaultMessage: 'Show grotesque warning',
  },
  unsetGrotesque: {
    id: `puzzle.unsetGrotesque`,
    defaultMessage: 'Hide grotesque warning',
  },
  setYami: {
    id: `puzzle.setYami`,
    defaultMessage: 'Make this puzzle yami',
  },
  unsetYami: {
    id: `puzzle.unsetYami`,
    defaultMessage: 'Make this puzzle non-yami',
  },
  grotesqueWarning: {
    id: `puzzle.grotesqueWarning`,
    defaultMessage: 'WARNING! This puzzle has grotesque descriptions',
  },
  goToPuzzlePage: {
    id: `puzzle.goToPuzzlePage`,
    defaultMessage: 'Go To Puzzle Page',
  },
  deleteTagConfirm: {
    id: `puzzle.deleteTagConfirm`,
    defaultMessage:
      'Your are going to delete this tag "{tag}". This operation cannot be reverted. Are you sure?',
  },
  deleteImageConfirm: {
    id: `puzzle.deleteImageConfirm`,
    defaultMessage: 'Your are attempting to delete this image. Continue?',
  },
});

export default messages;
