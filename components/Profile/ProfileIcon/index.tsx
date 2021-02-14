import React, { useEffect, useState } from 'react';
import multiavatar from '@multiavatar/multiavatar';
import { randomUUID } from 'common/random';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';
import commonMessages from 'messages/common';

import { useMutation } from '@apollo/client';
import { EDIT_ICON_MUTATION } from 'graphql/Mutations/User';

import { Flex, Box, Img, Button } from 'components/General';

import { ProfileIconProps } from './types';
import { ActionContentType, StateType } from 'reducers/types';
import {
  EditIconMutation,
  EditIconMutationVariables,
} from 'graphql/Mutations/generated/EditIconMutation';

const ProfileIcon = ({ user, userId, icon, setUserIcon }: ProfileIconProps) => {
  const [avatar, setAvatar] = useState(icon);

  const [updateIcon] = useMutation<EditIconMutation, EditIconMutationVariables>(
    EDIT_ICON_MUTATION,
  );

  useEffect(() => {
    setAvatar(icon);
  }, [userId])

  return userId === user.id ? (
    <Flex mx={1} mt={2} pt={2}>
      <Flex flexWrap="wrap" width={1}>
        <Box
          borderBottom="2px solid"
          borderColor="orange.4"
          color="orange.5"
          mt={2}
          width={1}
          fontSize={3}
        >
          <FormattedMessage {...userMessages.avatar} />
        </Box>
        <Flex width={1} flexDirection="column" justifyContent="center">
          {avatar && avatar.startsWith('multiavatar://') ? (
            <Box
              my={2}
              mx="auto"
              size="md"
              border="1px solid"
              borderRadius={4}
              dangerouslySetInnerHTML={{
                __html: multiavatar(avatar.slice(14), true),
              }}
            />
          ) : (
            <Img
              my={2}
              mx="auto"
              size="md"
              border="1px solid"
              borderRadius={4}
              src={avatar}
            />
          )}
          <Flex width={1} justifyContent="space-around">
            <Button
              minWidth="60px"
              onClick={() => setAvatar(`multiavatar://${randomUUID()}`)}
            >
              <FormattedMessage {...commonMessages.reload} />
            </Button>
            <Button
              minWidth="60px"
              onClick={() =>
                updateIcon({
                  variables: {
                    userId,
                    icon: avatar || null,
                  },
                }).then(({ data }) => {
                  if (data && data.updateUser) {
                    const { icon } = data.updateUser;
                    setUserIcon(icon);
                  }
                })
              }
            >
              <FormattedMessage {...commonMessages.save} />
            </Button>
            <Button
              minWidth="60px"
              onClick={() => {
                setAvatar(null);
              }}
            >
              <FormattedMessage {...commonMessages.none} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ) : null;
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setUserIcon: (icon: string | null) =>
    dispatch(globalReducer.actions.updateIcon(icon)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ProfileIcon);
