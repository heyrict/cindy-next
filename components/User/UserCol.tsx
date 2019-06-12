import React from 'react';
import { Link } from 'routes';
import { Img, Anchor } from 'components/General';
import { UserBaseProps, UserColBase } from './shared';
import { InlineUser } from './types';

interface UserColProps extends UserBaseProps {
  user: InlineUser;
  timestamp?: React.ReactNode;
}

const UserCol = ({ user, timestamp, ...props }: UserColProps) => {
  const NicknameBlock = user.id ? (
    <Link to="user" params={{ id: user.id }} passHref>
      <Anchor mr={1}>{user.nickname}</Anchor>
    </Link>
  ) : (
    <Anchor mr={1} as="div">
      {user.nickname}
    </Anchor>
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
