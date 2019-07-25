import { Directmessage } from 'graphql/Fragments/generated/Directmessage';

export type ChatProps = {
  currentChannel: string;
};

export type DirectmessageProps = {
  directmessage: Directmessage;
  currentUserId?: number;
};

export enum DirectmessageModeType {
  NORMAL,
  EDIT,
}
