import React from 'react';
import PropTypes from 'prop-types';
import { FormattedTime } from 'react-intl';

import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';
import { line2md } from 'common';
import ChatBubble from './ChatBubble';
import ChatBubbleTop from './ChatBubbleTop';

const Chatmessage = ({ chatmessage, orientation, anonymous }) => (
  <div>
    <ChatBubbleTop>
      {anonymous ? (
        <AnonymousUserInline
          px={1}
          timestamp={
            chatmessage.created && (
              <FormattedTime
                value={chatmessage.created}
                year="numeric"
                month="short"
                day="numeric"
              />
            )
          }
        />
      ) : (
        <UserInline
          px={1}
          user={chatmessage.sui_hei_user}
          timestamp={
            chatmessage.created && (
              <FormattedTime
                value={chatmessage.created}
                year="numeric"
                month="short"
                day="numeric"
              />
            )
          }
        />
      )}
    </ChatBubbleTop>
    <ChatBubble
      orientation={orientation || 'left'}
      dangerouslySetInnerHTML={{ __html: line2md(chatmessage.content) }}
    />
  </div>
);

Chatmessage.propTypes = {
  chatmessage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    sui_hei_user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      sui_hei_useraward: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created: PropTypes.string.isRequired,
        sui_hei_award: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }),
    created: PropTypes.string,
  }).isRequired,
  orientation: PropTypes.oneOf(['left', 'right']),
  anonymous: PropTypes.bool,
};

export default Chatmessage;
