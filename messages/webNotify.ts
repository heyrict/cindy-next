import { defineMessages } from 'react-intl';

const scope = 'webNotify';

export const webNotifyMessages = defineMessages({
  notSupportedMessage: {
    id: `${scope}.notSupportedMessage`,
    defaultMessage:
      'Notification will be disabled as it is not supported in your browser.',
  },
  deniedMessage: {
    id: `${scope}.deniedMessage`,
    defaultMessage:
      'Notification seems to be disabled by your browser settings. Cindy will not send you messages.\nIf you find the notifications annoying, simply close the Cindy tab instead of block it. Cindy will not send you notifications when Cindy tab is not open.',
  },
  newPuzzleAdded: {
    id: `${scope}.newPuzzleAdded`,
    defaultMessage: 'New Puzzle Added',
  },
  newPuzzleAddedDetail: {
    id: `${scope}.newPuzzleAddedDetail`,
    defaultMessage: '{user} adds a new puzzle "{puzzle}" of genre {genre}!',
  },
  newHintAdded: {
    id: `${scope}.newHintAdded`,
    defaultMessage: 'New Hint Added',
  },
  newDialogueAdded: {
    id: `${scope}.newDialogueAdded`,
    defaultMessage: 'New Question Added',
  },
  memoUpdated: {
    id: `${scope}.memoUpdated`,
    defaultMessage: 'Memo for Puzzle "{puzzle}" is updated',
  },
  puzzleSolved: {
    id: `${scope}.puzzleSolved`,
    defaultMessage: 'Puzzle "{puzzle}" has been solved',
  },
  newDMReceived: {
    id: `${scope}.newDMReceived`,
    defaultMessage: "You've just received a direct message from {user}",
  },
});

export default webNotifyMessages;
