import React from 'react';
import { connect } from 'react-redux';
import { getChannelWithPath } from 'common/channel';

import { createSelector } from 'reselect';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import messages from 'messages/components/chat';

import { Box, Flex, ButtonTransparent, Img } from 'components/General';
import Tooltip from 'components/Hoc/Tooltip';
import ChannelChangeModal from './ChannelChangeModal';
import DescriptionModal from './DescriptionModal';
import FavChatManipulateButton from './FavChatManipulateButton';

import infoIcon from 'svgs/info.svg';
import moreIcon from 'svgs/threeDotsVertical.svg';

import { ChannelBarProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const currentChannelSelector = createSelector(
  (state: StateType) => globalReducer.rootSelector(state).channel,
  (state: StateType) => globalReducer.rootSelector(state).route,
  (channel, route) => getChannelWithPath(channel, route),
);

const ChannelBar = ({
  chatroomId,
  channel,
  currentChannel,
  setTrueChannelChangeModal,
  setTrueDescriptionModal,
  relatedPuzzleId,
}: ChannelBarProps) => {
  return (
    <Box width={1} height="channelbar">
      <Flex bg="orange.5">
        <Flex color="white" alignItems="center" justifyContent="center" flexGrow={1}>
          {channel ? (
            currentChannel
          ) : (
            <FormattedMessage
              {...messages.channelAsDefault}
              values={{ channelName: currentChannel }}
            />
          )}
        </Flex>
        <Tooltip
          reference={
            <ButtonTransparent
              color="white"
              height="channelbar"
              onClick={() => chatroomId && setTrueDescriptionModal()}
            >
              <Img size="xxs" src={infoIcon} />
            </ButtonTransparent>
          }
          tooltip={<FormattedMessage {...commonMessages.info} />}
          delay={800}
        />
        {chatroomId && (
          <FavChatManipulateButton
            chatroomId={chatroomId}
            chatroomName={currentChannel}
	    compact
          />
        )}
        <Tooltip
          reference={
            <ButtonTransparent
              color="white"
              height="channelbar"
              onClick={() => setTrueChannelChangeModal()}
            >
              <Img size="xxs" src={moreIcon} />
            </ButtonTransparent>
          }
          tooltip={<FormattedMessage {...commonMessages.change} />}
          delay={800}
        />
      </Flex>
      <ChannelChangeModal />
      {chatroomId && (
        <DescriptionModal
          relatedPuzzleId={relatedPuzzleId}
          chatroomId={chatroomId}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentChannel: currentChannelSelector(state),
  channel: globalReducer.rootSelector(state).channel,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueDescriptionModal: () =>
    dispatch(chatReducer.actions.descriptionModal.setTrue()),
  setTrueChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setTrue()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelBar);
