import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Box, Flex, ButtonTransparent } from 'components/General';
import { getChannelWithPath } from 'common';

import { createSelector } from 'reselect';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import commonMessages from 'messages/common';
import messages from 'messages/components/chat';

import ChannelChangeModal from './ChannelChangeModal';
import DescriptionModal from './DescriptionModal';

import { ChannelBarProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

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
}: ChannelBarProps) => {
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
      {chatroomId && <DescriptionModal chatroomId={chatroomId} />}
    </Box>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentChannel: currentChannelSelector(state),
  channel: globalReducer.rootSelector(state).channel,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
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
