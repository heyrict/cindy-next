import { ChatroomDescription_chatroom_by_pk } from 'graphql/Queries/generated/ChatroomDescription';

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

export type ChatroomEditableDescriptionProps = {
  chatroomId: number;
};

export type ChatroomDescriptionInnerProps = {
  chatroom: ChatroomDescription_chatroom_by_pk;
  userId?: number;
};
