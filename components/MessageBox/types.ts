import { QueryResult } from 'react-apollo';
import {
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupMessagesQuery';
import { GlobalUserType, SendMessageTriggerType } from 'reducers/types';

export type MessageBoxProps = {
  directModal: boolean;
  directGroupUser: number | null;
  setFalseDirectModal: () => void;
  setDirectGroupUser: (userId: number | null) => void;
};

export type MessageGroupSelectProps = {
  userId?: number;
  setDirectGroupUser: (userId: number) => void;
};

export type MessageGroupChatInnerProps = {
  user: Required<GlobalUserType>;
  directGroupUser: number;
  sendChatTrigger: SendMessageTriggerType;
} & QueryResult<
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables
>;

export type MessageGroupChatProps = {
  user: GlobalUserType;
  directGroupUser: number | null;
  sendChatTrigger: SendMessageTriggerType;
};
