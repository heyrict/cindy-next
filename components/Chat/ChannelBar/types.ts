import { GlobalUserType } from 'reducers/types';

export type ChannelChangeModalProps = {
  channelChangeModal: boolean;
  setFalseChannelChangeModal: () => void;
};

export type DescriptionModalProps = {
  chatroomId: number;
  descriptionModal: boolean;
  setFalseDescriptionModal: () => void;
};

export type ChannelBarProps = {
  chatroomId?: number | null;
  channel: string;
  currentChannel: string;
  setTrueChannelChangeModal: () => void;
  setTrueDescriptionModal: () => void;
};

export type FavChatManipulateButtonProps = {
  user: GlobalUserType;
  chatroomId: number;
  chatroomName?: string;
};

export type InsertFavChatButtonProps = {
  chatroomId: number;
  chatroomName?: string;
};

export type DeleteFavChatButtonProps = {
  favchatId: number;
};

export type ChannelChangeInputProps = {
  channelChangeInput: string;
  setChannelChangeInput: (value: string) => void;
  setChannel: (channel: string) => void;
  setFalseChannelChangeModal: () => void;
};

export type FavoriteChatroomsListProps = {
  user: GlobalUserType;
  setChannel: (channel: string) => void;
  setFalseChannelChangeModal: () => void;
};
