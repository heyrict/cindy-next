import { defineMessages } from 'react-intl';

const scope = 'eula';

export const eulaMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'EULA',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'End User License Aggrement',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'EULA',
  },
});

export default eulaMessages;
