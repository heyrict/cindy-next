import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';

import UserInline from './UserInline';
import UserCol from './UserCol';

const anonymousUser = {
  id: 0,
  icon: '/static/images/anonymous.png',
};

export const AnonymousUserInline = ({ nickname, ...props }) => (
  <FormattedMessage {...userMessages.anonymousUser}>
    {msg => (
      <UserInline
        user={{ ...anonymousUser, nickname: nickname || msg }}
        {...props}
      />
    )}
  </FormattedMessage>
);

AnonymousUserInline.propTypes = {
  nickname: PropTypes.string,
};

export const AnonymousUserCol = ({ nickname, ...props }) => (
  <FormattedMessage {...userMessages.anonymousUser}>
    {msg => (
      <UserCol
        user={{ ...anonymousUser, nickname: nickname || msg }}
        {...props}
      />
    )}
  </FormattedMessage>
);

AnonymousUserCol.propTypes = {
  nickname: PropTypes.string,
};
