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
});

export default messages;
