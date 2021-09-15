import React from 'react';
import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';

import UserInline from './UserInline';
import UserCol from './UserCol';
import { AnonymousUserProps } from './types';

const anonymousUser = {
  id: 0,
  icon: '/static/images/anonymous.png',
};

export const AnonymousUserInline = ({
  nickname,
  ...props
}: AnonymousUserProps) =>
  nickname ? (
    <UserInline user={{ ...anonymousUser, nickname }} {...props} />
  ) : (
    <FormattedMessage {...userMessages.anonymousUser}>
      {msg => (
        <UserInline
          user={{ ...anonymousUser, nickname: msg as unknown as string }}
          {...props}
        />
      )}
    </FormattedMessage>
  );

export const AnonymousUserCol = ({ nickname, ...props }: AnonymousUserProps) =>
  nickname ? (
    <UserCol user={{ ...anonymousUser, nickname }} {...props} />
  ) : (
    <FormattedMessage {...userMessages.anonymousUser}>
      {msg => (
        <UserCol
          user={{ ...anonymousUser, nickname: msg as unknown as string }}
          {...props}
        />
      )}
    </FormattedMessage>
  );
