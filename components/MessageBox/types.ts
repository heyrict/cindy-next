import {
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupMessagesQuery';
import { GlobalUserType, SendMessageTriggerType } from 'reducers/types';
import {
  DirectmessageGroupQuery,
  DirectmessageGroupQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupQuery';
import { QueryResult } from '@apollo/react-common';

export type MessageBoxProps = {
  directModal: boolean;
  directGroupUser: number | null;
  setFalseDirectModal: () => void;
  setDirectGroupUser: (userId: number | null) => void;
};

export type MessageGroupSelectRendererProps = {
  userId: number;
  setDirectGroupUser: (userId: number) => void;
  setDirectHasnew: (hasnew: boolean) => void;
} & QueryResult<DirectmessageGroupQuery, DirectmessageGroupQueryVariables>;

export type MessageGroupSelectProps = {
  userId?: number;
  setDirectGroupUser: (userId: number) => void;
  setDirectHasnew: (hasnew: boolean) => void;
};

export type MessageGroupChatInnerProps = {
  user: Required<GlobalUserType>;
  directGroupUser: number;
  sendDirectmessageTrigger: SendMessageTriggerType;
} & QueryResult<
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables
>;

export type MessageGroupChatProps = {
  user: GlobalUserType;
  directGroupUser: number | null;
  sendDirectmessageTrigger: SendMessageTriggerType;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};
