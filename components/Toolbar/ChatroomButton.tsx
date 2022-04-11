import React from 'react';
import Link from 'next/link';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import ButtonTransparent from 'components/General/ButtonTransparent';

import { ChatroomButtonProps, ChatroomButtonDefaultProps } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const ChatroomButton = ({ color }: ChatroomButtonProps) => (
  <Link href="/channels" as={`/channels`} passHref>
    <ButtonTransparentA height={1} width={1} color={color}>
      <FormattedMessage {...toolbarMessages.chatroom} />
    </ButtonTransparentA>
  </Link>
);

ChatroomButton.defaultProps = ChatroomButtonDefaultProps;

export default ChatroomButton;
