import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  puzzleCountReaches: {
    id: `components.awardCheck.puzzleCountReaches`,
    defaultMessage:
      "Congratulations! You've created {count} puzzles and can get a new award!",
  },
  questionCountReaches: {
    id: `components.awardCheck.questionCountReaches`,
    defaultMessage:
      "Congratulations! You've asked {count} questions and can get a new award!",
  },
  goodQuestionCountReaches: {
    id: `components.awardCheck.goodQuestionCountReaches`,
    defaultMessage:
      "Congratulations! You've got {count} good questions and can get a new award!",
  },
  trueAnswerCountReaches: {
    id: `components.awardCheck.trueAnswerCountReaches`,
    defaultMessage:
      "Congratulations! You've got {count} true answers and can get a new award!",
  },
  goToAwardsPage: {
    id: `components.awardCheck.goToAwardsPage`,
    defaultMessage: 'Go to awards page',
  },
  getAward: {
    id: `components.awardCheck.getAward`,
    defaultMessage: "Congratulations! You've got a new award {name}!",
  },
});

export default messages;
