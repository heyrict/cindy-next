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
});

export default messages;
