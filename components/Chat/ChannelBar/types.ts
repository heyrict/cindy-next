import { GlobalUserType } from 'reducers/types';

export type ChannelChangeModalProps = {
  channelChangeModal: boolean;
  setFalseChannelChangeModal: () => void;
};

export type DescriptionModalProps = {
  chatroomId: number;
  descriptionModal: boolean;
  setFalseDescriptionModal: () => void;
  relatedPuzzleId?: number | null;
};

export type ChannelBarProps = {
  chatroomId?: number | null;
  channel: string;
  currentChannel: string;
  setTrueChannelChangeModal: () => void;
  setTrueDescriptionModal: () => void;
  relatedPuzzleId?: number | null;
};

export type FavChatManipulateButtonProps = {
  user: GlobalUserType;
  chatroomId: number;
  chatroomName?: string;
  compact?: boolean;
};

export type InsertFavChatButtonProps = {
  chatroomId: number;
  userId: number;
  chatroomName?: string;
  compact?: boolean;
};

export type DeleteFavChatButtonProps = {
  favchatId: number;
  userId: number;
  compact?: boolean;
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

export type ChatroomLogsProps = {
  chatroomId: number;
  relatedPuzzleId?: number | null;
};

export type PublicChatroomsListProps = {
  setChannel: (channel: string) => void;
  setFalseChannelChangeModal: () => void;
};
