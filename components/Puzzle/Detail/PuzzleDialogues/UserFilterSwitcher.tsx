import React from 'react';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

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
    <FilterButton
      active={activeUserId === -1}
      accent={false}
      onClick={() => onClick(-1)}
    >
      <FormattedMessage {...commonMessages.all} />
    </FilterButton>
    {users.map(user => (
      <FilterButton
        key={`UserFilterSwitcherUser-${user.id}`}
        accent={user.dialogueCount - user.answeredDialogueCount > 0}
        active={activeUserId === user.id}
        onClick={() => onClick(user.id)}
      >
        {user.dialogueHasTrue && <Img height="xxs" src={starFillIcon} />}
        {user.nickname}
        <sup>
          {user.dialogueCount - user.answeredDialogueCount}/{user.dialogueCount}
        </sup>
      </FilterButton>
    ))}
  </Flex>
);

UserFilterSwitcher.defaultProps = UserFilterSwitcherDefaltProps;

export default UserFilterSwitcher;
