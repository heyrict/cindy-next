import { defineMessages } from 'react-intl';

const scope = 'channel';

const channelPageMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Channel: {name}',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: ' A place for users to communicate in Cindy.',
  },
});

export default channelPageMessages;
