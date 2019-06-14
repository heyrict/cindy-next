import React from 'react';

import {
  UserFilterSwitcherProps,
  UserFilterSwitcherDefaltProps,
} from './types';
import { Flex, Img } from 'components/General';
import starFillIcon from 'svgs/starFill.svg';
import FilterButton from './FilterButton';

import { widthSplits } from '../constants';

const UserFilterSwitcher = ({
  users,
  onClick,
  activeUserId,
}: UserFilterSwitcherProps) => (
  <Flex
    justifyContent="center"
    flexWrap="wrap"
    width={1}
    p={1}
    mb={2}
    mx={widthSplits[0]}
    border="4px solid"
    borderColor="orange.3"
    bg="orange.1"
  >
    {users.map(user => (
      <FilterButton
        key={`UserFilterSwitcherUser-${user.id}`}
        accent={
          typeof user.dialogueUnsolvedCount === 'number' &&
          user.dialogueUnsolvedCount > 0
        }
        active={activeUserId === user.id}
        onClick={() => onClick(user.id)}
      >
        {user.dialogueHasTrue && <Img height="xxs" src={starFillIcon} />}
        {user.nickname}
        <sup>
          {typeof user.dialogueUnsolvedCount === 'number'
            ? `${user.dialogueUnsolvedCount}/`
            : null}
          {user.dialogueCount}
        </sup>
      </FilterButton>
    ))}
  </Flex>
);

UserFilterSwitcher.defaultProps = UserFilterSwitcherDefaltProps;

export default UserFilterSwitcher;
