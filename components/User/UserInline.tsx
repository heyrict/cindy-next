import React from 'react';

import { Img, Flex, Anchor, EditTimeSpan } from 'components/General';
import UserBriefProfile from './UserBriefProfile';
import CurrentUserAward from './CurrentUserAward';

import { UserInlineBase } from './shared';
import { UserInlineProps } from './types';

const AnchorDiv = Anchor.withComponent('span');

const UserInline = ({ user, timestamp, ...props }: UserInlineProps) => {
  const NicknameBlock = (
    <Flex flexWrap="wrap" alignItems="baseline" ml={1}>
      {user.id > 0 ? (
        <React.Fragment>
          <UserBriefProfile user={user} />
          {user.currentAward && (
            <CurrentUserAward user_award={user.currentAward} />
          )}
        </React.Fragment>
      ) : (
        <AnchorDiv>{user.nickname}</AnchorDiv>
      )}
    </Flex>
  );

  return user.icon ? (
    <UserInlineBase alignItems="center" {...props}>
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
          <EditTimeSpan>{timestamp}</EditTimeSpan>
        </Flex>
      ) : (
        NicknameBlock
      )}
    </UserInlineBase>
  ) : (
    <UserInlineBase {...props}>
      {NicknameBlock}
      <EditTimeSpan>{timestamp}</EditTimeSpan>
    </UserInlineBase>
  );
};

export default UserInline;
