import React from 'react';
import { Link } from 'routes';
import { Img, Flex, Anchor } from 'components/General';

import { UserBaseProps, UserInlineBase } from './shared';
import { UserInlineProps } from './types';

const UserInline = ({
  user,
  timestamp,
  ...props
}: UserInlineProps & UserBaseProps) => {
  const NicknameBlock = user.id ? (
    <Link to="user" params={{ id: user.id }} passHref>
      <Anchor maxWidth="12em" mr={1}>
        {user.nickname}
      </Anchor>
    </Link>
  ) : (
    <Anchor mr={1} as="div">
      {user.nickname}
    </Anchor>
  );

  return user.icon ? (
    <UserInlineBase {...props}>
      <Img
        mr={1}
        size="xs"
        border="1px solid"
        borderRadius={4}
        src={user.icon}
      />
      {timestamp ? (
        <Flex flexDirection="column">
          {NicknameBlock}
          {timestamp}
        </Flex>
      ) : (
        NicknameBlock
      )}
    </UserInlineBase>
  ) : (
    <UserInlineBase {...props}>
      {NicknameBlock}
      {timestamp}
    </UserInlineBase>
  );
};

export default UserInline;
