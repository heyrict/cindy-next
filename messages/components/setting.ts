import { defineMessages } from 'react-intl';

const scope = 'setting';

export const settingMessages = defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  puzzleGenreImg: {
    id: `${scope}.puzzleGenreImg`,
    defaultMessage: 'Display Genre Image',
  },
  sendMessageTrigger: {
    id: `${scope}.sendMessageTrigger`,
    defaultMessage: 'Send Message Trigger',
  },
  sendChatTrigger: {
    id: `${scope}.sendChatTrigger`,
    defaultMessage: 'Send Chat Message',
  },
  sendDirectmessageTrigger: {
    id: `${scope}.sendDirectmessageTrigger`,
    defaultMessage: 'Send Direct Message',
  },
  sendQuestionTrigger: {
    id: `${scope}.sendQuestionTrigger`,
    defaultMessage: 'Send Question',
  },
  editQuestionTrigger: {
    id: `${scope}.editQuestionTrigger`,
    defaultMessage: 'Edit Question',
  },
  sendAnswerTrigger: {
    id: `${scope}.sendAnswerTrigger`,
    defaultMessage: 'Send Answer',
  },
  multicol: {
    id: `${scope}.multicol`,
    defaultMessage: 'Prefer Multiple Columns',
  },
  rightAsideMini: {
    id: `${scope}.rightAsideMini`,
    defaultMessage: '(Puzzle Page) Floating box size',
  },
  notification: {
    id: `${scope}.notification`,
    defaultMessage: 'Notification',
  },
  pushNotification: {
    id: `${scope}.pushNotification`,
    defaultMessage: 'Push Notification',
  },
  confirmCreatePuzzle: {
    id: `${scope}.confirmCreatePuzzle`,
    defaultMessage: 'Confirm Before Create Puzzle',
  },
  showGrotesqueWarning: {
    id: `${scope}.showGrotesqueWarning`,
    defaultMessage: 'Show Grotesque Warning',
  },
  defaultLicense: {
    id: `${scope}.defaultLicense`,
    defaultMessage: 'Default License',
  },
});

export default settingMessages;
