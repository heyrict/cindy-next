import { defineMessages } from 'react-intl';

const scope = 'awards';

const awardsMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Awards Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Get awards for use in Cindy!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Awards',
  },
  group_puzzleCount: {
    id: `${scope}.group_puzzleCount`,
    defaultMessage: 'Puzzle Count Related',
  },
  group_questionCount: {
    id: `${scope}.group_questionCount`,
    defaultMessage: 'Question Count Related',
  },
  group_goodQuestionCount: {
    id: `${scope}.group_goodQuestionCount`,
    defaultMessage: 'Good Question Count Related',
  },
  group_trueAnswerCount: {
    id: `${scope}.group_trueAnswerCount`,
    defaultMessage: 'True Answer Count Related',
  },
  group_mixed: {
    id: `${scope}.group_mixed`,
    defaultMessage: 'Mixed',
  },
  group_yamiPuzzleCount: {
    id: `${scope}.group_yamiPuzzleCount`,
    defaultMessage: 'Yami Count Related',
  },
  group_yamiPuzzleMaxDialoguesCount: {
    id: `${scope}.group_yamiPuzzleMaxDialoguesCount`,
    defaultMessage: 'Yami Question Count Related',
  },
  group_puzzleGenreCount: {
    id: `${scope}.group_puzzleGenreCount`,
    defaultMessage: 'Puzzle Count By Genre',
  },
  group_puzzleStarCount: {
    id: `${scope}.group_puzzleStarCount`,
    defaultMessage: 'Star Count By Puzzle',
  },
  group_starSum: {
    id: `${scope}.group_starSum`,
    defaultMessage: 'Star Sum Related',
  },
});

export default awardsMessages;
