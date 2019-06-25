import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getChannelWithPath } from 'common/channel';

import * as globalReducer from 'reducers/global';

import ChatRoom from './ChatRoom';

import { ChatProps } from './types';
import { StateType } from 'reducers/types';

const currentChannelSelector = createSelector(
  state => globalReducer.rootSelector(state).channel,
  state => globalReducer.rootSelector(state).route,
  (channel, route) => getChannelWithPath(channel, route),
);

const Chat = ({ currentChannel }: ChatProps) => (
  <ChatRoom chatroom={currentChannel} />
);

const mapStateToProps = (state: StateType) => ({
  currentChannel: currentChannelSelector(state),
});

const withRedux = connect(mapStateToProps);

export default compose(withRedux)(Chat);
