import React from 'react';
import { toast } from 'react-toastify';

import { Box, ButtonTransparent } from 'components/General';

import { useMutation } from '@apollo/client';
import { CHANGE_CURRERNT_USERAWARD_MUTATION } from 'graphql/Mutations/User';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { UserAwardsEditProps } from './types';
import {
  ChangeCurrentUserawardMutation,
  ChangeCurrentUserawardMutationVariables,
} from 'graphql/Mutations/generated/ChangeCurrentUserawardMutation';

const UserAwardsEdit = ({
  setEdit,
  currentUserAward,
  userAwards,
  userId,
}: UserAwardsEditProps) => {
  const [changeCurrentUserAward] = useMutation<
    ChangeCurrentUserawardMutation,
    ChangeCurrentUserawardMutationVariables
  >(CHANGE_CURRERNT_USERAWARD_MUTATION, {
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      setEdit(true);
    },
  });

  return (
    <React.Fragment>
      <Box
        borderRadius={1}
        m={1}
        bg={currentUserAward === null ? 'orange.3' : 'transparent'}
      >
        <ButtonTransparent
          borderRadius={1}
          onClick={() => {
            changeCurrentUserAward({
              variables: {
                userId: userId,
                userawardId: null,
              },
              optimisticResponse: {
                updateUser: {
                  __typename: 'User',
                  id: userId,
                  currentAward: null,
                },
              },
            });
            setEdit(false);
          }}
        >
          <FormattedMessage {...commonMessages.none} />
        </ButtonTransparent>
      </Box>
      {userAwards.map(userAward => (
        <Box
          key={userAward.id}
          borderRadius={1}
          m={1}
          bg={
            currentUserAward && currentUserAward.id === userAward.id
              ? 'orange.3'
              : 'transparent'
          }
        >
          <ButtonTransparent
            borderRadius={1}
            onClick={() => {
              changeCurrentUserAward({
                variables: {
                  userId: userId,
                  userawardId: userAward.id,
                },
                optimisticResponse: {
                  updateUser: {
                    __typename: 'User',
                    id: userId,
                    currentAward: userAward,
                  },
                },
              });
              setEdit(false);
            }}
          >
            {userAward.award.name}
          </ButtonTransparent>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default UserAwardsEdit;
