import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from '@apollo/react-components';
import { CHANGE_HIDE_BOOKMARK_MUTATION } from 'graphql/Mutations/User';

import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';
import commonMessages from 'messages/common';

import Switch from 'components/General/Switch';
import Flex from 'components/General/Flex';

import {
  ChangeHideBookmarkMutation,
  ChangeHideBookmarkMutationVariables,
} from 'graphql/Mutations/generated/ChangeHideBookmarkMutation';
import { ApolloError } from '@apollo/client';

import { ProfileHideBookmarksToggleProps } from './types';

const ProfileHideBookmarksToggle = ({
  userId,
  hideBookmark,
}: ProfileHideBookmarksToggleProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

  return (
    <Mutation<ChangeHideBookmarkMutation, ChangeHideBookmarkMutationVariables>
      mutation={CHANGE_HIDE_BOOKMARK_MUTATION}
    >
      {changeHideBookmark => (
        <Flex width={1} mb={2} alignItems="center">
          <Switch
            selected={hideBookmark}
            onClick={() => {
              changeHideBookmark({
                variables: {
                  userId,
                  hideBookmark: !hideBookmark,
                },
                optimisticResponse: {
                  updateUser: {
                    __typename: 'User',
                    id: userId,
                    hideBookmark: !hideBookmark,
                  },
                },
              })
                .then(res => {
                  if (!res) return;
                  const { errors } = res;
                  if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                  if (errors) {
                    toast.error(JSON.stringify(errors));
                    return;
                  }
                  toast.info(<FormattedMessage {...commonMessages.saved} />);
                })
                .catch((e: ApolloError) => {
                  if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                  toast.error(JSON.stringify(e.message));
                });
              notifHdlRef.current = toast.info(
                <FormattedMessage {...commonMessages.saving} />,
              );
            }}
          />
          <FormattedMessage {...userMessages.hideBookmark} />
        </Flex>
      )}
    </Mutation>
  );
};

export default ProfileHideBookmarksToggle;
