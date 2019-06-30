import React from 'react';

import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';

import { Box, ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { UserAwardsBarDefaultProps, UserAwardsBarProps } from './types';

const UserAwardsBar = ({ editable, onClick }: UserAwardsBarProps) => (
  <Box
    borderBottom="2px solid"
    borderColor="orange.4"
    color="orange.5"
    mt={2}
    width={1}
    fontSize={3}
  >
    <FormattedMessage {...userMessages.useraward} />
    {editable && (
      <ButtonTransparent onClick={onClick}>
        <Img height="xxs" src={pencilIcon} alt="edit" />
      </ButtonTransparent>
    )}
  </Box>
);

UserAwardsBar.defaultProps = UserAwardsBarDefaultProps;

export default UserAwardsBar;
