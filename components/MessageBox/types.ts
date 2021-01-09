import { GlobalUserType, SendMessageTriggerType } from 'reducers/types';

export type MessageBoxProps = {
  directModal: boolean;
  directGroupUser: number | null;
  setFalseDirectModal: () => void;
  setDirectGroupUser: (userId: number | null) => void;
};

export type MessageGroupSelectProps = {
  userId: number;
  setDirectGroupUser: (userId: number) => void;
  setDirectHasnew: (hasnew: boolean) => void;
};

export type MessageGroupChatInnerProps = {
  user: Required<GlobalUserType>;
  directGroupUser: number;
  sendDirectmessageTrigger: SendMessageTriggerType;
};

export type MessageGroupChatProps = {
  user: GlobalUserType;
  directGroupUser: number | null;
  sendDirectmessageTrigger: SendMessageTriggerType;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};
