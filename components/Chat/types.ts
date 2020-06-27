import { DirectMessage } from 'graphql/Fragments/generated/DirectMessage';

export type ChatProps = {
  currentChannel: string;
};

export type DirectmessageProps = {
  direct_message: DirectMessage;
  currentUserId?: number;
};

export enum DirectmessageModeType {
  NORMAL,
  EDIT,
}
