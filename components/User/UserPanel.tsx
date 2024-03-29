import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import multiavatar from '@multiavatar/multiavatar';
import { text2raw } from 'common/markdown';

import { connect } from 'react-redux';
import * as directReducer from 'reducers/direct';

import {
  Panel,
  Box,
  ButtonTransparent,
  Img,
  EditTimeSpan,
  Flex,
} from 'components/General';
import homeIcon from 'svgs/home.svg';
import messageIcon from 'svgs/message.svg';

import { FormattedMessage, FormattedTime } from 'react-intl';
import authMessages from 'messages/components/auth';

import { UserPanelProps, UserPanelDefaultProps } from './types';
import { ActionContentType } from 'reducers/types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const UserPanel = ({ user, maxLength, directChatWithUser }: UserPanelProps) => (
  <Panel
    minHeight="4em"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center"
  >
    <Flex minWidth="50%" flexGrow={1} alignItems="center" mb={1}>
      {user.icon && (
        <Box mx={1} display="inline-block">
          {user.icon.startsWith('multiavatar://') ? (
            <Box
              mr={1}
              size="sm"
              border="1px solid"
              borderRadius={4}
              dangerouslySetInnerHTML={{
                __html: multiavatar(user.icon.slice(14), true),
              }}
            />
          ) : (
            <Img
              mr={1}
              size="sm"
              border="1px solid"
              borderRadius={4}
              src={user.icon}
            />
          )}
        </Box>
      )}
      <Box mx={1} display="inline-block">
        {user.nickname}
      </Box>
      <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
        <ButtonTransparentA p={1}>
          <Img height="xxs" src={homeIcon} alt="Home" />
        </ButtonTransparentA>
      </Link>
      <ButtonTransparent p={1} onClick={() => directChatWithUser(user.id)}>
        <Img height="xxs" src={messageIcon} alt="Message" />
      </ButtonTransparent>
    </Flex>
    <Box minWidth="50%" style={{ flexGrow: 1 }} mb={1}>
      <EditTimeSpan>
        <FormattedMessage {...authMessages.dateJoined} />:
        <FormattedTime
          year="numeric"
          month="short"
          day="numeric"
          value={user.dateJoined}
        />
      </EditTimeSpan>
    </Box>
    {user.profile.trim() !== '' && (
      <ButtonTransparent
        width={1}
        onClick={() => {
          Router.push('/user/[id]', `/user/${user.id}`);
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

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  directChatWithUser: (userId: number) =>
    dispatch(directReducer.actions.directChatWithUser(userId)),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(UserPanel);
