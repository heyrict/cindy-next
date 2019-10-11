export type ChannelAsideProps = {
  setTrueDescriptionModal: () => void;
  setTrueChannelChangeModal: () => void;
  setTrueChatroomCreateModal: () => void;
};

export type ChatroomLogsModalProps = {
  chatroomId: number;
  descriptionModal: boolean;
  setFalseDescriptionModal: () => void;
  relatedPuzzleId?: number | null;
};

export type ChatroomCreateModalProps = {
  chatroomCreateModal: boolean;
  setFalseChatroomCreateModal: () => void;
  setChannel: (channelName: string) => void;
};
