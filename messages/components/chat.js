import { defineMessages } from 'react-intl';

const scope = 'components.chat';

export const messages = defineMessages({
  channelAsDefault: {
    id: `${scope}.channelAsDefault`,
    defaultMessage: 'Default ({channelName})',
  },
  changeChannel: {
    id: `${scope}.changeChannel`,
    defaultMessage: 'Change Channel',
  },
  changeToDefaultChannel: {
    id: `${scope}.changeToDefaultChannel`,
    defaultMessage: 'Change To Default Channel',
  },
});

export default messages;
