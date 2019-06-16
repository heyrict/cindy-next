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
  selectPanel: {
    id: `${scope}.selectPanel`,
    defaultMessage: 'Select Keywords',
  },
  mergePanel: {
    id: `${scope}.mergePanel`,
    defaultMessage: 'Merge Keywords',
  },
  renamePanel: {
    id: `${scope}.renamePanel`,
    defaultMessage: 'Rename Keywords',
  },
  firstLoadingIsTimeConsuming: {
    id: `${scope}.firstLoadingIsTimeConsuming`,
    defaultMessage:
      'Now Loading text parsing tools, it may consume several minites for the first time...',
  },
});

export default messages;
