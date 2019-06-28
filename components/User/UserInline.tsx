import React from 'react';
import { Link } from 'routes';
import { Img, Flex, Anchor, EditTimeSpan } from 'components/General';
import CurrentUserAward from './CurrentUserAward';

import { UserInlineBase } from './shared';
import { UserInlineProps, UserBaseProps } from './types';

const AnchorDiv = Anchor.withComponent('span');

const UserInline = ({
  user,
  timestamp,
  ...props
}: UserInlineProps & UserBaseProps) => {
  const NicknameBlock = (
    <Flex alignItems="center" mr={1}>
      {user.id > 0 ? (
        <React.Fragment>
          <Link to="user" params={{ id: user.id }} passHref>
            <Anchor maxWidth="12em">{user.nickname}</Anchor>
          </Link>
          {user.sui_hei_current_useraward && (
            <CurrentUserAward useraward={user.sui_hei_current_useraward} />
          )}
        </React.Fragment>
      ) : (
        <AnchorDiv>{user.nickname}</AnchorDiv>
      )}
    </Flex>
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
