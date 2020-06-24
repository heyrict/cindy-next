import { defineMessages } from 'react-intl';

const scope = 'components.replay';

export const replayMessages = defineMessages({
  original: {
    id: `${scope}.original`,
    defaultMessage: 'Original Puzzle',
  },
  milestone_handle: {
    id: `${scope}.milestone_handle`,
    defaultMessage: 'Handle',
  },
  milestone_name: {
    id: `${scope}.milestone_name`,
    defaultMessage: 'Name',
  },
  milestone_desc: {
    id: `${scope}.milestone_desc`,
    defaultMessage: 'Description',
  },
  clue: {
    id: `${scope}.clue`,
    defaultMessage: 'Clue',
  },
  keyword: {
    id: `${scope}.keyword`,
    defaultMessage: 'Keyword',
  },
});

export default replayMessages;
