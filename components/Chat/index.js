import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getChannelWithPath } from 'common';

import * as globalReducer from 'reducers/global';

import ChatRoom from './ChatRoom';

const currentChannelSelector = createSelector(
  state => globalReducer.rootSelector(state).channel,
  state => globalReducer.rootSelector(state).route,
  (channel, route) => getChannelWithPath(channel, route),
);

const Chat = ({ currentChannel }) => <ChatRoom chatroom={currentChannel} />;

Chat.propTypes = {
  currentChannel: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentChannel: currentChannelSelector(state),
});

const withRedux = connect(mapStateToProps);

export default compose(withRedux)(Chat);
