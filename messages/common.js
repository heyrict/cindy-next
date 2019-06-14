import { defineMessages } from 'react-intl';

const scope = 'common';

export const messages = defineMessages({
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  change: {
    id: `${scope}.change`,
    defaultMessage: 'Change',
  },
  default: {
    id: `${scope}.default`,
    defaultMessage: 'Default',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading...',
  },
  apply: {
    id: `${scope}.apply`,
    defaultMessage: 'Apply',
  },
  editTimes: {
    id: `${scope}.editTimes`,
    defaultMessage: '[Edited ({count})]',
  },
  none: {
    id: `${scope}.none`,
    defaultMessage: 'None',
  },
  notExist: {
    id: `${scope}.notExist`,
    defaultMessage: 'Page Not Exists',
  },
});

export default messages;
