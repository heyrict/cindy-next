import { GlobalUserType } from 'reducers/types';

export type ChatRoomInputProps = {
  chatroomId: number;
  user: GlobalUserType;
  sendChatTrigger: number;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};

export type ChatRoomMessagesBodyProps = {
  chatroomId: number;
  relatedPuzzleId?: number | null;
  user: GlobalUserType;
  chatmessageUpdate: (chatroomId: number, messagesHash: number) => void;
  autoExpand: boolean;
};

export const ChatRoomMessagesDefaultProps = {
  autoExpand: false,
};

export type ChatRoomMessagesProps = {
  chatroomId?: number;
  relatedPuzzleId?: number | null;
  user: GlobalUserType;
  chatmessageUpdate: (chatroomId: number, messagesHash: number) => void;
} & typeof ChatRoomMessagesDefaultProps;

export type ChatRoomProps = {
  chatroom?: string;
};
