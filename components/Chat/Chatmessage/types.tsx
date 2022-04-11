import { Chatmessage } from 'graphql/Fragments/generated/Chatmessage';
import { Chatroom } from 'graphql/Fragments/generated/Chatroom';

export type ChatBubbleOrientationType = 'left' | 'right';

export type ChatBubbleProps = {
  orientation?: ChatBubbleOrientationType;
};

export type ChatmessageProps = {
  chatmessage: Chatmessage;
  chatroom?: Chatroom;
  anonymous?: boolean;
  currentUserId: number | null;
};

export enum ChatmessageModeType {
  NORMAL,
  EDIT,
}
