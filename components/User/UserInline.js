import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { space, color, fontSize } from 'styled-system';
import { Link } from 'routes';
import { Img, Flex, Anchor } from 'components/General';

import { PTUserInlineUser } from './PropTypes';

const UserInlineBase = styled.div`
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  ${space}
  ${color}
  ${fontSize}
`;

const UserInline = ({ user, timestamp, ...props }) => {
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

UserInline.propTypes = {
  user: PTUserInlineUser,
  timestamp: PropTypes.node,
};

export default UserInline;
