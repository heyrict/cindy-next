import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
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
import { ProfileHideBookmarksToggleProps } from './types';

const ProfileHideBookmarksToggle = ({
  userId,
  hideBookmark,
}: ProfileHideBookmarksToggleProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const [changeHideBookmark] = useMutation<
    ChangeHideBookmarkMutation,
    ChangeHideBookmarkMutationVariables
  >(CHANGE_HIDE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      toast.info(<FormattedMessage {...commonMessages.saved} />);
    },
    onError: error => {
      if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
      toast.error(`${error.name}: ${error.message}`);
    },
  });

  return (
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
          });
          notifHdlRef.current = toast.info(
            <FormattedMessage {...commonMessages.saving} />,
          );
        }}
      />
      <FormattedMessage {...userMessages.hideBookmark} />
    </Flex>
  );
};

export default ProfileHideBookmarksToggle;
