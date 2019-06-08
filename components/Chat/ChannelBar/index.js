import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Box, Flex, Input, ButtonTransparent } from 'components/General';
import { getChannelWithPath } from 'common';

import { createSelector } from 'reselect';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import commonMessages from 'messages/common';
import messages from 'messages/components/chat';

import ChannelChangeModal from './ChannelChangeModal';
import DescriptionModal from './DescriptionModal';

const currentChannelSelector = createSelector(
  state => globalReducer.rootSelector(state).channel,
  state => globalReducer.rootSelector(state).route,
  (channel, route) => getChannelWithPath(channel, route),
);

const ChannelBar = ({
  chatroomId,
  channel,
  currentChannel,
  setTrueChannelChangeModal,
  setTrueDescriptionModal,
}) => {
  return (
    <Box width={1} height="channelbar">
      <Flex bg="orange.5">
        <ButtonTransparent
          color="white"
          height="channelbar"
          width={2 / 3}
          onClick={() => chatroomId && setTrueDescriptionModal()}
        >
          {channel ? (
            currentChannel
          ) : (
            <FormattedMessage
              {...messages.channelAsDefault}
              values={{ channelName: currentChannel }}
            />
          )}
        </ButtonTransparent>
        <ButtonTransparent
          color="white"
          height="channelbar"
          width={1 / 3}
          onClick={() => setTrueChannelChangeModal()}
        >
          <FormattedMessage {...commonMessages.change} />
        </ButtonTransparent>
      </Flex>
      <ChannelChangeModal />
      <DescriptionModal chatroomId={chatroomId} />
    </Box>
  );
};

ChannelBar.propTypes = {
  chatroomId: PropTypes.number,
  channel: PropTypes.string.isRequired,
  currentChannel: PropTypes.string.isRequired,
  setTrueChannelChangeModal: PropTypes.func.isRequired,
  setTrueDescriptionModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentChannel: currentChannelSelector(state),
  channel: globalReducer.rootSelector(state).channel,
});

const mapDispatchToProps = dispatch => ({
  setTrueDescriptionModal: () =>
    dispatch(chatReducer.actions.setTrueDescriptionModal()),
  setTrueChannelChangeModal: () =>
    dispatch(chatReducer.actions.setTrueChannelChangeModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelBar);
