import { defineMessages } from 'react-intl';

const scope = 'components.dialogue';

export const dialogueMessages = defineMessages({
  question: {
    id: `${scope}.question`,
    defaultMessage: 'Question',
  },
  answer: {
    id: `${scope}.answer`,
    defaultMessage: 'Answer',
  },
});

export default dialogueMessages;
