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
  puzzleStarRankingWithMonth: {
    id: `${scope}.puzzleStarRankingWithMonth`,
    defaultMessage: 'Puzzles with most stars in {date}',
  },
  puzzleStarRanking: {
    id: `${scope}.puzzleStarRanking`,
    defaultMessage: 'Puzzle Ranking by Stars',
  },
  userDialogueRankingWithMonth: {
    id: `${scope}.userDialogueRankingWithMonth`,
    defaultMessage: 'Users with most questions in {date}',
  },
  userDialogueRanking: {
    id: `${scope}.userDialogueRanking`,
    defaultMessage: 'User Ranking by Questions',
  },
  userPuzzleRanking: {
    id: `${scope}.userPuzzleRanking`,
    defaultMessage: 'User Ranking by Puzzles',
  },
});

export default messages;
