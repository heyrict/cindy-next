import { defineMessages } from 'react-intl';

const scope = 'workbench';

export const messages = defineMessages({
  keywords: {
    id: `${scope}.keywords`,
    defaultMessage: 'Keywords',
  },
  roughMode: {
    id: `${scope}.roughMode`,
    defaultMessage: 'Batch Editing',
  },
  oneByOneMode: {
    id: `${scope}.oneByOneMode`,
    defaultMessage: 'One-by-One Editing',
  },
  milestonesMode: {
    id: `${scope}.milestonesMode`,
    defaultMessage: 'Milestone Editing',
  },
  dependencyMode: {
    id: `${scope}.dependencyMode`,
    defaultMessage: 'Dependency Editing',
  },
  puzzleMode: {
    id: `${scope}.puzzleMode`,
    defaultMessage: 'Puzzle Information',
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
