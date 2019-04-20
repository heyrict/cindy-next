import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { space, color, fontSize, width } from 'styled-system';
import Link from 'next/link';
import { Img, Flex, Anchor } from 'components/General';

import { PTUserInlineUser } from './PropTypes';

const UserColBase = styled.div`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${space}
  ${width}
  ${color}
  ${fontSize}
`;

const UserCol = ({ user, timestamp, ...props }) => {
  const NicknameBlock = user.id ? (
    <Link href={`/user/${user.id}`} passHref>
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

UserCol.propTypes = {
  user: PTUserInlineUser,
  timestamp: PropTypes.node,
};

export default UserCol;
