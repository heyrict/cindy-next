import { ChatroomDescription_chatroom } from 'graphql/Queries/generated/ChatroomDescription';

export type ChannelAsideProps = {};

export type ChatroomLogsModalProps = {
  chatroomId: number;
  descriptionModal: boolean;
  setFalseDescriptionModal: () => void;
  relatedPuzzleId?: number | null;
};

export type ChatroomEditableDescriptionProps = {
  chatroomId: number;
};

export type ChatroomDescriptionInnerProps = {
  chatroom: ChatroomDescription_chatroom;
};
