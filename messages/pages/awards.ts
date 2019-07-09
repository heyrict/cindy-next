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
  heading: {
    id: `${scope}.heading`,
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
});

export default awardsMessages;
