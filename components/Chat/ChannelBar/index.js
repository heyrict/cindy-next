import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Subscribe } from 'unstated';
import { withRouter } from 'next/router';
import { Box, Flex, Input, ButtonTransparent } from 'components/General';

import ChannelContainer from 'containers/global/Channel';
import OnlyShowContainer from 'containers/reusable/OnlyShow';

import commonMessages from 'messages/common';
import messages from 'messages/components/chat';

import ChannelChangeModal from './ChannelChangeModal';
import DescriptionModal from './DescriptionModal';

const descModalContainer = new OnlyShowContainer();
const changeModalContainer = new OnlyShowContainer();

const ChannelBar = ({ router, chatroomId }) => (
  <Subscribe to={[ChannelContainer, descModalContainer, changeModalContainer]}>
    {(channelCont, descModalCont, changeModalCont) => {
      const currentChannel = channelCont.getChannelWithPath(router.pathname);
      return (
        <Box width={1} height="channelbar">
          <Flex bg="kigaracha">
            <ButtonTransparent
              color="lightyellow"
              height="channelbar"
              width={2 / 3}
              onClick={() => chatroomId && descModalCont.show()}
            >
              {channelCont.state.channel ? (
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
              onClick={() => changeModalCont.show()}
            >
              <FormattedMessage {...commonMessages.change} />
            </ButtonTransparent>
          </Flex>
          <ChannelChangeModal cont={changeModalCont} />
          <DescriptionModal chatroomId={chatroomId} cont={descModalCont} />
        </Box>
      );
    }}
  </Subscribe>
);

ChannelBar.propTypes = {
  chatroomId: PropTypes.number,
};

export default withRouter(ChannelBar);
