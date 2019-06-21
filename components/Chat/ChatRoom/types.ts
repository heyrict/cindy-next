import { GlobalUserType } from 'reducers/types';
import {
  ChatroomChatmessages,
  ChatroomChatmessagesVariables,
} from 'graphql/Queries/generated/ChatroomChatmessages';
import { QueryResult } from 'react-apollo';

export type ChatRoomInputProps = {
  chatroomId: number;
  user: GlobalUserType;
};

export type ChatRoomMessagesBodyProps = {
  chatroomId: number;
  relatedPuzzleId?: number | null;
  user: GlobalUserType;
  chatmessageUpdate: (chatroomId: number, messagesHash: number) => void;
} & QueryResult<ChatroomChatmessages, ChatroomChatmessagesVariables>;

export type ChatRoomMessagesProps = {
  chatroomId?: number;
  relatedPuzzleId?: number | null;
  user: GlobalUserType;
  chatmessageUpdate: (chatroomId: number, messagesHash: number) => void;
};

export type ChatRoomProps = {
  chatroom?: string;
};
