import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChannelWithPath } from 'common';

import * as globalReducer from 'reducers/global';

import ChatRoom from './ChatRoom';

const Chat = ({ channel, route }) => (
  <ChatRoom chatroom={getChannelWithPath(channel, route)} />
);

Chat.propTypes = {
  channel: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  channel: globalReducer.rootSelector(state).channel,
  route: globalReducer.rootSelector(state).route,
});

const withRedux = connect(mapStateToProps);

export default compose(withRedux)(Chat);
