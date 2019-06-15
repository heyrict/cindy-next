export type ChannelChangeModalProps = {
  channelChangeInput: string;
  channelChangeModal: boolean;
  setChannelChangeInput: (value: string) => void;
  setChannel: (channel: string) => void;
  setFalseChannelChangeModal: () => void;
};

export type DescriptionModalProps = {
  chatroomId: number;
  descriptionModal: boolean;
  setFalseDescriptionModal: () => void;
};

export type ChannelBarProps = {
  chatroomId?: number;
  channel: string;
  currentChannel: string;
  setTrueChannelChangeModal: () => void;
  setTrueDescriptionModal: () => void;
};