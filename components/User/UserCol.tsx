import React from 'react';

import { Img, Anchor, Box } from 'components/General';
import { UserColBase } from './shared';
import UserBriefProfile from './UserBriefProfile';
import CurrentUserAward from './CurrentUserAward';

import { UserColProps } from './types';

const AnchorDiv = Anchor.withComponent('div');

const UserCol = ({ user, timestamp, ...props }: UserColProps) => {
  const NicknameBlock =
    user.id > 0 ? (
      <UserBriefProfile user={user} />
    ) : (
      <AnchorDiv mr={1}>{user.nickname}</AnchorDiv>
    );

  return (
    <UserColBase {...props}>
      {user.icon && (
        <Img
          mr={1}
          size="sm"
          border="1px solid"
          borderRadius={4}
          src={user.icon}
        />
      )}
      {NicknameBlock}
      {user.current_user_award && (
        <Box fontSize="0.9em">
          <CurrentUserAward user_award={user.current_user_award} />
        </Box>
      )}
      {timestamp}
    </UserColBase>
  );
};

export default UserCol;
