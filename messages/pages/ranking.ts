import { defineMessages } from 'react-intl';

const scope = 'ranking';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Ranking',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Ranking board for users',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Ranking',
  },
  rank: {
    id: `${scope}.rank`,
    defaultMessage: 'Rank {rank}',
  },
  puzzleStarRanking: {
    id: `${scope}.puzzleStarRanking`,
    defaultMessage: 'Puzzles with most stars in {date}',
  },
});

export default messages;
