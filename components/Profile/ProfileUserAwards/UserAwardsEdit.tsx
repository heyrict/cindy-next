import React from 'react';
import { toast } from 'react-toastify';

import { Box, ButtonTransparent } from 'components/General';

import { Mutation } from 'react-apollo';
import { CHANGE_CURRERNT_USERAWARD_MUTATION } from 'graphql/Mutations/User';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { UserAwardsEditProps } from './types';
import {
  ChangeCurrentUserawardMutation,
  ChangeCurrentUserawardMutationVariables,
} from 'graphql/Mutations/generated/ChangeCurrentUserawardMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';

const UserAwardsEdit = ({
  setEdit,
  currentUserAward,
  userAwards,
  userId,
}: UserAwardsEditProps) => (
  <Mutation<
    ChangeCurrentUserawardMutation,
    ChangeCurrentUserawardMutationVariables
  >
    mutation={CHANGE_CURRERNT_USERAWARD_MUTATION}
  >
    {changeCurrentUserAward => (
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
                  update_sui_hei_user: {
                    __typename: 'sui_hei_user_mutation_response',
                    returning: [
                      {
                        __typename: 'sui_hei_user',
                        id: userId,
                        sui_hei_current_useraward: null,
                      },
                    ],
                  },
                },
              })
                .then(result => {
                  if (!result) return;
                  const { errors } = result;
                  if (errors) {
                    toast.error(JSON.stringify(errors));
                    setEdit(true);
                  }
                })
                .catch((error: ApolloError) => {
                  toast.error(error.message);
                  setEdit(true);
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
                    update_sui_hei_user: {
                      __typename: 'sui_hei_user_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_user',
                          id: userId,
                          sui_hei_current_useraward: userAward,
                        },
                      ],
                    },
                  },
                })
                  .then(result => {
                    if (!result) return;
                    const { errors } = result;
                    if (errors) {
                      toast.error(JSON.stringify(errors));
                      setEdit(true);
                    }
                  })
                  .catch((error: ApolloError) => {
                    toast.error(error.message);
                    setEdit(true);
                  });
                setEdit(false);
              }}
            >
              {userAward.sui_hei_award.name}
            </ButtonTransparent>
          </Box>
        ))}
      </React.Fragment>
    )}
  </Mutation>
);

export default UserAwardsEdit;
