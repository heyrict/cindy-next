import React from 'react';
import { withRouter } from 'next/router';
import { Subscribe } from 'unstated';

import ChannelContainer from 'containers/global/Channel';
import ChatRoom from './ChatRoom';

const Chat = ({ router }) => {
  return (
    <Subscribe to={[ChannelContainer]}>
      {cont => <ChatRoom chatroom={cont.getChannelWithPath(router.pathname)} />}
    </Subscribe>
  );
};

export default withRouter(Chat);
