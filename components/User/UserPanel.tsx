import React from 'react';
import { Router, Link } from 'routes';
import { text2raw } from 'common/markdown';

import {
  Panel,
  Box,
  ButtonTransparent,
  Img,
  EditTimeSpan,
} from 'components/General';
import homeIcon from 'svgs/home.svg';
import messageIcon from 'svgs/message.svg';

import { FormattedMessage, FormattedTime } from 'react-intl';
import authMessages from 'messages/components/auth';

import { UserPanelProps, UserPanelDefaultProps } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const UserPanel = ({ user, maxLength }: UserPanelProps) => (
  <Panel
    minHeight="4em"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center"
  >
    <Box minWidth="50%" style={{ flexGrow: 1 }} mb={1}>
      <Box mx={1} display="inline-block">
        {user.nickname}
      </Box>
      <Link to="user" params={{ id: user.id }} passHref>
        <ButtonTransparentA p={1}>
          <Img height="xxs" src={homeIcon} alt="Home" />
        </ButtonTransparentA>
      </Link>
      <ButtonTransparent p={1}>
        <Img height="xxs" src={messageIcon} alt="Message" />
      </ButtonTransparent>
    </Box>
    <Box minWidth="50%" style={{ flexGrow: 1 }} mb={1}>
      <EditTimeSpan>
        <FormattedMessage {...authMessages.date_joined} />:
        <FormattedTime
          year="numeric"
          month="short"
          day="numeric"
          value={user.date_joined}
        />
      </EditTimeSpan>
    </Box>
    {user.profile.trim() !== '' && (
      <ButtonTransparent
        width={1}
        onClick={() => {
          Router.pushRoute('user', { id: user.id });
        }}
      >
        <Box
          width={1}
          borderY="1px solid"
          fontSize="12px"
          maxHeight="120px"
          textAlign="left"
          overflow="hidden"
          py={1}
          dangerouslySetInnerHTML={{
            __html: `${text2raw(user.profile)
              .substr(0, maxLength)
              .replace(/\n/g, '<br />')}${
              user.profile.length > maxLength ? '...' : ''
            }`,
          }}
        />
      </ButtonTransparent>
    )}
  </Panel>
);

UserPanel.defaultProps = UserPanelDefaultProps;

export default UserPanel;
