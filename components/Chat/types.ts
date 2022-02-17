import { DirectMessageBrief } from 'graphql/Fragments/generated/DirectMessageBrief';

export type ChatProps = {
  currentChannel: string;
};

export type DirectmessageProps = {
  directMessage: DirectMessageBrief;
  currentUserId: number | null;
};

export enum DirectmessageModeType {
  NORMAL,
  EDIT,
}
