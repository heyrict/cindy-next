import React from 'react';
import { text2md } from 'common/markdown';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';

import { Box } from 'components/General';

import { ProfileDisplayProps } from './types';

const ProfileDisplay = ({ profile }: ProfileDisplayProps) =>
  profile ? (
    <Box dangerouslySetInnerHTML={{ __html: text2md(profile) }} />
  ) : (
    <Box py={2}>
      <FormattedMessage {...userPageMessages.profileIsEmpty} />
    </Box>
  );

export default ProfileDisplay;
