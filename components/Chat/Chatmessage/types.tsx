import { Chatmessage } from 'graphql/Fragments/generated/Chatmessage';

export type ChatBubbleOrientationType = 'left' | 'right';

export type ChatBubbleProps = {
  orientation?: ChatBubbleOrientationType
};

export type ChatmessageProps = {
  chatmessage: Chatmessage;
  orientation?: ChatBubbleOrientationType
  anonymous?: boolean;
};
