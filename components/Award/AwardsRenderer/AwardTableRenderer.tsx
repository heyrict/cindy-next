import React from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { Box, Img, ButtonTransparent } from 'components/General';
import acceptIcon from 'svgs/accept.svg';
import denyIcon from 'svgs/deny.svg';
import plusIcon from 'svgs/plus.svg';

import { Mutation } from '@apollo/react-components';
import { AWARDS_INFO_QUERY } from 'graphql/Queries/Awards';
import { ADD_AWARD_MUTATION } from 'graphql/Mutations/Award';

import { FormattedMessage } from 'react-intl';
import awardCheckMessages from 'messages/components/awardCheck';

import CurrentUserAward from 'components/User/CurrentUserAward';
import { AwardTableRendererProps, AwardStatusType } from './types';
import {
  AddAwardMutation,
  AddAwardMutationVariables,
} from 'graphql/Mutations/generated/AddAwardMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';
import {
  AwardsInfoQuery,
  AwardsInfoQueryVariables,
} from 'graphql/Queries/generated/AwardsInfoQuery';

const AwardTable = styled.table`
  text-align: center;
  width: 100%;
`;

function AwardTableRenderer<T = number>({
  awardsDefs,
  awardsObj,
  header,
  checker,
  userInfo,
  getStatusLabel,
}: AwardTableRendererProps<T>) {
  return (
    <Box width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]} mb={2}>
      <Box textAlign="center" fontSize={2} color="orange.6" width={1}>
        {header}
      </Box>
      {userInfo ? (
        <AwardTable>
          <Mutation<AddAwardMutation, AddAwardMutationVariables>
            mutation={ADD_AWARD_MUTATION}
          >
            {addAward => (
              <tbody>
                {Object.entries(awardsObj).map(([key, awardObj]) => {
                  let awardStatusContent = null;
                  const awardId = parseInt(key);
                  const award = awardsDefs.find(a => a.id === awardId);
                  const awardStatus = checker(awardId, awardObj);
                  if (!award) return null;
                  switch (awardStatus) {
                    case AwardStatusType.GET:
                      awardStatusContent = (
                        <td>
                          <Img height="xxs" src={acceptIcon} />
                        </td>
                      );
                      break;
                    case AwardStatusType.REACH:
                      awardStatusContent = (
                        <td>
                          <ButtonTransparent
                            onClick={() => {
                              addAward({
                                variables: { awardId },
                                optimisticResponse: {
                                  insert_user_award: {
                                    __typename: 'user_award_mutation_response',
                                    returning: [
                                      {
                                        __typename: 'user_award',
                                        id: -1,
                                        created: new Date().toISOString(),
                                        award: award,
                                      },
                                    ],
                                  },
                                },
                                update: (proxy, { data }) => {
                                  if (!data || !data.insert_user_award) return;
                                  const newUserAward =
                                    data.insert_user_award.returning;
                                  if (newUserAward.length < 1) return;

                                  // Update AwardsInfoQuery
                                  const awardsInfoResult = proxy.readQuery<
                                    AwardsInfoQuery,
                                    AwardsInfoQueryVariables
                                  >({
                                    query: AWARDS_INFO_QUERY,
                                    variables: {
                                      userId: userInfo.id,
                                    },
                                  });
                                  if (
                                    awardsInfoResult &&
                                    awardsInfoResult.user_by_pk
                                  )
                                    proxy.writeQuery({
                                      query: AWARDS_INFO_QUERY,
                                      variables: {
                                        userId: userInfo.id,
                                      },
                                      data: {
                                        ...awardsInfoResult,
                                        user_by_pk: {
                                          ...awardsInfoResult.user_by_pk,
                                          user_awards: awardsInfoResult.user_by_pk.user_awards.concat(
                                            {
                                              __typename: 'user_award',
                                              id: newUserAward[0].id,
                                              award_id:
                                                newUserAward[0].award.id,
                                            },
                                          ),
                                        },
                                      },
                                    });
                                },
                              })
                                .then(() => {
                                  toast.success(
                                    <FormattedMessage
                                      {...awardCheckMessages.getAward}
                                      values={{ name: award.name }}
                                    />,
                                  );
                                })
                                .catch((e: ApolloError) => {
                                  toast.error(e.message);
                                });
                            }}
                          >
                            <Img height="xxs" src={plusIcon} />
                          </ButtonTransparent>
                        </td>
                      );
                      break;
                    case AwardStatusType.WAIT:
                      awardStatusContent = (
                        <td>
                          <Img height="xxs" src={denyIcon} />
                        </td>
                      );
                      break;
                  }
                  return (
                    <tr key={award.id}>
                      <td>{getStatusLabel(awardObj)}</td>
                      <td>
                        <CurrentUserAward
                          user_award={{
                            id: -1,
                            award: award,
                          }}
                        />
                      </td>
                      {awardStatusContent}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Mutation>
        </AwardTable>
      ) : (
        <AwardTable>
          <tbody>
            {Object.entries(awardsObj).map(([key, awardObj]) => {
              const awardId = parseInt(key);
              const award = awardsDefs.find(a => a.id === awardId);
              if (!award) return null;
              return (
                <tr key={awardId}>
                  <td>{getStatusLabel(awardObj)}</td>
                  <td>
                    <CurrentUserAward
                      user_award={{
                        id: -1,
                        award: award,
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AwardTable>
      )}
    </Box>
  );
}

export default AwardTableRenderer;
