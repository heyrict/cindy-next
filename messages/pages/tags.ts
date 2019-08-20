import { defineMessages } from 'react-intl';

const scope = 'tags';

export const tagsPageMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Tags',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Puzzle tags in Cindy!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Tags',
  },
  tagName: {
    id: `${scope}.tagName`,
    defaultMessage: 'Tag Name',
  },
  tagCreated: {
    id: `${scope}.tagCreated`,
    defaultMessage: 'Created Time',
  },
  tagPuzzleCount: {
    id: `${scope}.tagPuzzleCount`,
    defaultMessage: 'Puzzle Count',
  },
});

export default tagsPageMessages;
