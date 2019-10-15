import React from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import ButtonTransparent from 'components/General/ButtonTransparent';

import { ChatroomButtonProps, ChatroomButtonDefaultProps } from './types';
import { StateType } from 'reducers/types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const ChatroomButton = ({ channel, color }: ChatroomButtonProps) => (
  <Link href="/channel/[name]" as={`/channel/${channel || 'lobby'}`} passHref>
    <ButtonTransparentA height={1} width={1} color={color}>
      <FormattedMessage {...toolbarMessages.chatroom} />
    </ButtonTransparentA>
  </Link>
);

ChatroomButton.defaultProps = ChatroomButtonDefaultProps;

const mapStateToProps = (state: StateType) => ({
  channel: globalReducer.rootSelector(state).channel,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatroomButton);
