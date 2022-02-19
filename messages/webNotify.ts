import { defineMessages } from 'react-intl';

export const webNotifyMessages = defineMessages({
  notSupportedMessage: {
    id: `webNotify.notSupportedMessage`,
    defaultMessage:
      'Notification will be disabled as it is not supported in your browser.',
  },
  deniedMessage: {
    id: `webNotify.deniedMessage`,
    defaultMessage:
      'Notification seems to be disabled by your browser settings. Cindy will not send you messages.\nIf you find the notifications annoying, simply close the Cindy tab instead of block it. Cindy will not send you notifications when Cindy tab is not open.',
  },
  newPuzzleAdded: {
    id: `webNotify.newPuzzleAdded`,
    defaultMessage: 'New Puzzle Added',
  },
  newPuzzleAddedDetail: {
    id: `webNotify.newPuzzleAddedDetail`,
    defaultMessage: '{user} adds a new puzzle "{puzzle}" of genre {genre}!',
  },
  newHintAdded: {
    id: `webNotify.newHintAdded`,
    defaultMessage: 'New Hint Added',
  },
  newDialogueAdded: {
    id: `webNotify.newDialogueAdded`,
    defaultMessage: 'New Question Added',
  },
  memoUpdated: {
    id: `webNotify.memoUpdated`,
    defaultMessage: 'Memo for Puzzle "{puzzle}" is updated',
  },
  puzzleSolved: {
    id: `webNotify.puzzleSolved`,
    defaultMessage: 'Puzzle "{puzzle}" has been solved',
  },
  newDMReceived: {
    id: `webNotify.newDMReceived`,
    defaultMessage: "You've just received a direct message from {user}",
  },
});

export default webNotifyMessages;
