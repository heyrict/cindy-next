import { defineMessages } from 'react-intl';

const scope = 'workbench';

export const messages = defineMessages({
  keywords: {
    id: `${scope}.keywords`,
    defaultMessage: 'Keywords',
  },
  minKeywordAppearance: {
    id: `${scope}.minKeywordAppearance`,
    defaultMessage: 'Min appearance',
  },
});

export default messages;
