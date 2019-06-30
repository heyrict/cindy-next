import React from 'react';

import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';

import { Box, ButtonTransparent, Img } from 'components/General';
import pencilIcon from 'svgs/pencil.svg';

import { ProfileBarProps, ProfileBarDefaultProps } from './types';

const ProfileBar = ({ editable, onClick }: ProfileBarProps) => (
  <Box
    borderBottom="2px solid"
    borderColor="orange.4"
    color="orange.5"
    mt={2}
    width={1}
    fontSize={3}
  >
    <FormattedMessage {...userMessages.profile} />
    {editable && (
      <ButtonTransparent onClick={onClick}>
        <Img height="xxs" src={pencilIcon} alt="edit" />
      </ButtonTransparent>
    )}
  </Box>
);

ProfileBar.defaultProps = ProfileBarDefaultProps;

export default ProfileBar;
