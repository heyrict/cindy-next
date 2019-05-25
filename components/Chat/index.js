import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getChannelWithPath } from 'common';

import * as globalReducer from 'reducers/global';

import ChatRoom from './ChatRoom';

const Chat = ({ channel, router }) => (
  <ChatRoom chatroom={getChannelWithPath(channel, router.pathname)} />
);

Chat.propTypes = {
  channel: PropTypes.string.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  channel: globalReducer.rootSelector(state).channel,
});

const withRedux = connect(mapStateToProps);

export default compose(
  withRedux,
  withRouter,
)(Chat);
