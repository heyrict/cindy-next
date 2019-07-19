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
  rightAsideMini: {
    id: `${scope}.rightAsideMini`,
    defaultMessage: '(Puzzle Page) Floating box size',
  },
});

export default settingMessages;
