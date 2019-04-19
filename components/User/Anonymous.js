import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import UserInline from 'components/User/UserInline';

import userMessages from 'messages/components/user';

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
