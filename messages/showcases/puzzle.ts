import { defineMessages } from 'react-intl';

const scope = 'showcases.puzzle';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'White over white',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage:
      'Rubbers are usually used to clear texts, while A take the rubber with the intention to write texts.\n\nWhy?',
  },
  q1: {
    id: `${scope}.q1`,
    defaultMessage: 'Is the rubber white?',
  },
  a1: {
    id: `${scope}.a1`,
    defaultMessage: 'Yes!',
  },
  q2: {
    id: `${scope}.q2`,
    defaultMessage: 'Does friction count?',
  },
  a2: {
    id: `${scope}.a2`,
    defaultMessage: 'No',
  },
  goToSolution: {
    id: `${scope}.goToSolution`,
    defaultMessage: 'View Answer',
  },
});

export default messages;
