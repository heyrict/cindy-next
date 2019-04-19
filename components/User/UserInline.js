import React from 'react';
import styled from '@emotion/styled';
import { space, color, fontSize } from 'styled-system';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Img, Flex } from 'components/General';

const UserInlineBase = styled.div`
  display: inline-flex;
  align-items: center;
  ${space}
  ${color}
  ${fontSize}
`;

const LinkBase = styled.a`
  display: inline-block;
  color: ${p => p.theme.colors.ruri};
  margin-right: ${p => p.theme.space[1]}px;
  &:hover,
  &:active {
    color: ${p => p.theme.colors.chigusa};
  }
`;

const UserInline = ({ user, timestamp, ...props }) => {
  const NicknameBlock = user.id ? (
    <Link href={`/user/${user.id}`}>
      <LinkBase>{user.nickname}</LinkBase>
    </Link>
  ) : (
    <LinkBase as="div">{user.nickname}</LinkBase>
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    username: PropTypes.string,
    sui_hei_current_useraward: PropTypes.shape({
      id: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
      sui_hei_award: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  timestamp: PropTypes.node,
};

export default UserInline;
