import { defineMessages } from 'react-intl';

const scope = 'components.puzzle';

export const messages = defineMessages({
  genre_classic: {
    id: `${scope}.genre_classic`,
    defaultMessage: 'Classic',
  },
  genre_twentyQuestions: {
    id: `${scope}.genre_twentyQuestions`,
    defaultMessage: 'Twenty Questions',
  },
  genre_littleAlbat: {
    id: `${scope}.genre_littleAlbat`,
    defaultMessage: 'Little Albat',
  },
  genre_others: {
    id: `${scope}.genre_others`,
    defaultMessage: 'Others',
  },
});

export default messages;
