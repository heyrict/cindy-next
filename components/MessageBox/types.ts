import {
  DirectMessageGroupMessagesQuery,
  DirectMessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectMessageGroupMessagesQuery';
import { GlobalUserType, SendMessageTriggerType } from 'reducers/types';
import {
  DirectMessageGroupQuery,
  DirectMessageGroupQueryVariables,
} from 'graphql/Queries/generated/DirectMessageGroupQuery';
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
} & QueryResult<DirectMessageGroupQuery, DirectMessageGroupQueryVariables>;

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
  DirectMessageGroupMessagesQuery,
  DirectMessageGroupMessagesQueryVariables
>;

export type MessageGroupChatProps = {
  user: GlobalUserType;
  directGroupUser: number | null;
  sendDirectmessageTrigger: SendMessageTriggerType;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};
