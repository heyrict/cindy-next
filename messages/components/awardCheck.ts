import { defineMessages } from 'react-intl';

const scope = 'components.awardCheck';

export const messages = defineMessages({
  puzzleCountReaches: {
    id: `${scope}.puzzleCountReaches`,
    defaultMessage:
      "Congratulations! You've created {count} puzzles and can get a new award!",
  },
  questionCountReaches: {
    id: `${scope}.questionCountReaches`,
    defaultMessage:
      "Congratulations! You've asked {count} questions and can get a new award!",
  },
  goodQuestionCountReaches: {
    id: `${scope}.goodQuestionCountReaches`,
    defaultMessage:
      "Congratulations! You've got {count} good questions and can get a new award!",
  },
  trueAnswerCountReaches: {
    id: `${scope}.trueAnswerCountReaches`,
    defaultMessage:
      "Congratulations! You've got {count} true answers and can get a new award!",
  },
  goToAwardsPage: {
    id: `${scope}.goToAwardsPage`,
    defaultMessage: 'Go to awards page',
  },
  getAward: {
    id: `${scope}.getAward`,
    defaultMessage: "Congratulations! You've got a new award {name}!",
  },
});

export default messages;
