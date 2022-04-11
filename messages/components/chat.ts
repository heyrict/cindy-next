import { defineMessages } from 'react-intl';

export const chatMessages = defineMessages({
  channelAsDefault: {
    id: `components.chat.channelAsDefault`,
    defaultMessage: 'Default ({channelName})',
  },
  changeChannel: {
    id: `components.chat.changeChannel`,
    defaultMessage: 'Change Channel',
  },
  currentChannel: {
    id: `components.chat.currentChannel`,
    defaultMessage: 'Current: {name}',
  },
  changeToDefaultChannel: {
    id: `components.chat.changeToDefaultChannel`,
    defaultMessage: 'Change To Default Channel',
  },
  notExistDescription: {
    id: `components.chat.notExistDescription`,
    defaultMessage: 'This chatroom does not exist!',
  },
  addToFavoriteChatrooms: {
    id: `components.chat.addToFavoriteChatrooms`,
    defaultMessage: 'Add To Favorite Chatrooms',
  },
  deleteFromFavoriteChatrooms: {
    id: `components.chat.deleteFromFavoriteChatrooms`,
    defaultMessage: 'Delete From Favorite Chatrooms',
  },
  favoriteChatrooms: {
    id: `components.chat.favoriteChatrooms`,
    defaultMessage: 'My Favorite Chatrooms',
  },
  officialChatrooms: {
    id: `components.chat.officialChatrooms`,
    defaultMessage: 'Official Chatrooms',
  },
  publicChatrooms: {
    id: `components.chat.publicChatrooms`,
    defaultMessage: 'Public Chatrooms',
  },
  noDescription: {
    id: `components.chat.noDescription`,
    defaultMessage: 'This chatroom does not have a description.',
  },
  noSelfDM: {
    id: `components.chat.noSelfDM`,
    defaultMessage: 'You cannot send message to yourself.',
  },
  noLogs: {
    id: `components.chat.noLogs`,
    defaultMessage: 'There are no logs here',
  },
  log: {
    id: `components.chat.log`,
    defaultMessage: 'Logs',
  },
  chatroomName: {
    id: `components.chat.chatroomName`,
    defaultMessage: 'Chatroom Name',
  },
  chatroomDescription: {
    id: `components.chat.chatroomDescription`,
    defaultMessage: 'Chatroom Description',
  },
  chatroomCreated: {
    id: `components.chat.chatroomCreated`,
    defaultMessage: 'Successfully created chatroom {name}',
  },
  channels: {
    id: `components.chat.channels`,
    defaultMessage: 'Channels',
  },
  createChannel: {
    id: `components.chat.createChannel`,
    defaultMessage: 'Create Channel',
  },
  openToPublic: {
    id: `components.chat.openToPublic`,
    defaultMessage: 'Open to public',
  },
});

export default chatMessages;
