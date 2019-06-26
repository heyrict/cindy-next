import React from 'react';
import { Link } from 'routes';
import { Img, Flex, Anchor } from 'components/General';

import { UserInlineBase } from './shared';
import { UserInlineProps, UserBaseProps } from './types';

const AnchorDiv = Anchor.withComponent('div');

const UserInline = ({
  user,
  timestamp,
  ...props
}: UserInlineProps & UserBaseProps) => {
  const NicknameBlock =
    user.id > 0 ? (
      <Link to="user" params={{ id: user.id }} passHref>
        <Anchor maxWidth="12em" mr={1}>
          {user.nickname}
        </Anchor>
      </Link>
    ) : (
      <AnchorDiv mr={1}>{user.nickname}</AnchorDiv>
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
