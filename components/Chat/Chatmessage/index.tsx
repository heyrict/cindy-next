import React from 'react';
import { FormattedTime } from 'react-intl';

import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';
import { line2md } from 'common';
import ChatBubble from './ChatBubble';
import ChatBubbleTop from './ChatBubbleTop';

import { ChatmessageProps } from './types';

const Chatmessage = ({
  chatmessage,
  orientation,
  anonymous,
}: ChatmessageProps) => (
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

export default Chatmessage;
