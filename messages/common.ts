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
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
  notExist: {
    id: `${scope}.notExist`,
    defaultMessage: 'Page Not Exists',
  },
  loadMore: {
    id: `${scope}.loadMore`,
    defaultMessage: 'Load More',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Continue',
  },
  patron: {
    id: `${scope}.patron`,
    defaultMessage: 'Patron',
  },
});

export default messages;
