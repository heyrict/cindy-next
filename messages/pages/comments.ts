import { defineMessages } from 'react-intl';

const scope = 'comments';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Comments',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Discover interesting puzzles with comments by users in Cindy!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Comments List',
  },
});

export default messages;
