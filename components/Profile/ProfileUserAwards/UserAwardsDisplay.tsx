import React from 'react';

import { Box } from 'components/General';
import UserAward from 'components/User/CurrentUserAward';

import { UserAwardsDisplayProps } from './types';

const UserAwardsDisplay = ({
  currentUserAward,
  userAwards,
}: UserAwardsDisplayProps) => (
  <React.Fragment>
    {userAwards.map(userAward => (
      <Box
        key={userAward.id}
        borderRadius={1}
        m={1}
        bg={
          currentUserAward && currentUserAward.id === userAward.id
            ? 'orange.3'
            : 'transparent'
        }
      >
        <UserAward useraward={userAward} />
      </Box>
    ))}
  </React.Fragment>
);

export default UserAwardsDisplay;
