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
  notExistDescription: {
    id: `${scope}.notExistDescription`,
    defaultMessage: 'This chatroom does not exist!',
  },
  addToFavoriteChatrooms: {
    id: `${scope}.addToFavoriteChatrooms`,
    defaultMessage: 'Add To Favorite Chatrooms',
  },
  deleteFromFavoriteChatrooms: {
    id: `${scope}.deleteFromFavoriteChatrooms`,
    defaultMessage: 'Delete From Favorite Chatrooms',
  },
  favoriteChatrooms: {
    id: `${scope}.favoriteChatrooms`,
    defaultMessage: 'My Favorite Chatrooms',
  },
  noDescription: {
    id: `${scope}.noDescription`,
    defaultMessage: 'This chatroom does not have a description.',
  },
});

export default messages;
