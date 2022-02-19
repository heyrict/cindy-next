import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: `ranking.title`,
    defaultMessage: 'Ranking',
  },
  description: {
    id: `ranking.description`,
    defaultMessage: 'Ranking board for users',
  },
  header: {
    id: `ranking.header`,
    defaultMessage: 'Ranking',
  },
  rank: {
    id: `ranking.rank`,
    defaultMessage: 'Rank {rank}',
  },
  monthlyRanking: {
    id: `ranking.monthlyRanking`,
    defaultMessage: 'Monthly Ranking',
  },
  weeklyRanking: {
    id: `ranking.weeklyRanking`,
    defaultMessage: 'Weekly Ranking',
  },
  puzzleStarRankingWithMonth: {
    id: `ranking.puzzleStarRankingWithMonth`,
    defaultMessage: 'Puzzles with most stars in {date}',
  },
  puzzleStarRanking: {
    id: `ranking.puzzleStarRanking`,
    defaultMessage: 'Puzzle Ranking by Stars',
  },
  userDialogueRankingWithMonth: {
    id: `ranking.userDialogueRankingWithMonth`,
    defaultMessage: 'Users with most questions in {date}',
  },
  userDialogueRanking: {
    id: `ranking.userDialogueRanking`,
    defaultMessage: 'User Ranking by Questions',
  },
  userPuzzleRankingWithMonth: {
    id: `ranking.userPuzzleRankingWithMonth`,
    defaultMessage: 'Users with most puzzles in {date}',
  },
  userPuzzleRanking: {
    id: `ranking.userPuzzleRanking`,
    defaultMessage: 'User Ranking by Puzzles',
  },
});

export default messages;
