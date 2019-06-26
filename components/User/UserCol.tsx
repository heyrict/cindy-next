import React from 'react';
import { Link } from 'routes';
import { Img, Anchor } from 'components/General';
import { UserColBase } from './shared';

import { UserColProps } from './types';

const AnchorDiv = Anchor.withComponent('div');

const UserCol = ({ user, timestamp, ...props }: UserColProps) => {
  const NicknameBlock = user.id ? (
    <Link to="user" params={{ id: user.id }} passHref>
      <Anchor mr={1}>{user.nickname}</Anchor>
    </Link>
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
      {timestamp}
    </UserColBase>
  );
};

export default UserCol;
