import { defineMessages } from 'react-intl';

const scope = 'share';

export const shareMessages = defineMessages({
  share_puzzle__title: {
    id: `${scope}.share_puzzle__title`,
    defaultMessage: 'Join me in the lateral thinking puzzle!',
  },
  share_puzzle__text: {
    id: `${scope}.share_puzzle__text`,
    defaultMessage:
      'I\'m playing lateral puzzle "{title}". Come and join me!\n{body}',
  },
  share_puzzle__hashtags: {
    id: `${scope}.share_puzzle__hashtags`,
    defaultMessage: 'lateral_thinking',
  },
  share_puzzle_solved__title: {
    id: `${scope}.share_puzzle_solved__title`,
    defaultMessage: 'Found an interesting lateral thinking puzzle!',
  },
  share_puzzle_solved__text: {
    id: `${scope}.share_puzzle_solved__text`,
    defaultMessage:
      'Just found an interesting lateral puzzle "{title}".\n{body}',
  },
  share_puzzle_solved__hashtags: {
    id: `${scope}.share_puzzle_solved__hashtags`,
    defaultMessage: 'lateral_thinking',
  },
});

export default shareMessages;
