import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'next/router';
import { Box, Flex, Input, ButtonTransparent } from 'components/General';
import { getChannelWithPath } from 'common';

import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import commonMessages from 'messages/common';
import messages from 'messages/components/chat';

import ChannelChangeModal from './ChannelChangeModal';
import DescriptionModal from './DescriptionModal';

const ChannelBar = ({
  router,
  chatroomId,
  channel,
  setTrueChannelChangeModal,
  setTrueDescriptionModal,
}) => {
  const currentChannel = getChannelWithPath(channel, router.pathname);

  return (
    <Box width={1} height="channelbar">
      <Flex bg="kigaracha">
        <ButtonTransparent
          color="lightyellow"
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
          color="lightyellow"
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
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  chatroomId: PropTypes.number,
  channel: PropTypes.string.isRequired,
  setTrueChannelChangeModal: PropTypes.func.isRequired,
  setTrueDescriptionModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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

export default withRedux(withRouter(ChannelBar));
