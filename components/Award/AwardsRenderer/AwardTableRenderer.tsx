import React from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { Box, Img, ButtonTransparent } from 'components/General';
import CurrentUserAward from 'components/User/CurrentUserAward';
import acceptIcon from 'svgs/accept.svg';
import denyIcon from 'svgs/deny.svg';
import plusIcon from 'svgs/plus.svg';

import { useMutation } from '@apollo/client';
import { AWARDS_INFO_QUERY } from 'graphql/Queries/Awards';
import { ADD_AWARD_MUTATION } from 'graphql/Mutations/Award';

import { FormattedMessage } from 'react-intl';
import awardCheckMessages from 'messages/components/awardCheck';

import { AwardTableRendererProps, AwardStatusType } from './types';
import {
  AddAwardMutation,
  AddAwardMutationVariables,
} from 'graphql/Mutations/generated/AddAwardMutation';
import { ApolloError } from '@apollo/client/errors';
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
  const _getSortKey = ([k, v]: [string, any]) =>
    typeof v === 'number' ? v : parseInt(k);
  const awardsEntries = Object.entries(awardsObj).sort(
    (a, b) => _getSortKey(a) - _getSortKey(b),
  );
  const [addAward] = useMutation<AddAwardMutation, AddAwardMutationVariables>(
    ADD_AWARD_MUTATION,
    {
      update: (proxy, { data }) => {
        if (!data || !userInfo) return;
        const newUserAward = data.createUserAward;

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
        if (awardsInfoResult && awardsInfoResult.user)
          proxy.writeQuery({
            query: AWARDS_INFO_QUERY,
            variables: {
              userId: userInfo.id,
            },
            data: {
              ...awardsInfoResult,
              user: {
                ...awardsInfoResult.user,
                userAwards: awardsInfoResult.user.userAwards.concat({
                  __typename: 'UserAward',
                  id: newUserAward.id,
                  awardId: newUserAward.award.id,
                }),
              },
            },
          });
      },
    },
  );

  return (
    <Box width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]} mb={2}>
      <Box textAlign="center" fontSize={2} color="orange.6" width={1}>
        {header}
      </Box>
      <AwardTable>
        <tbody>
          {userInfo
            ? awardsEntries.map(([key, awardObj]) => {
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
                                createUserAward: {
                                  __typename: 'UserAward',
                                  id: -1,
                                  created: new Date().toISOString(),
                                  award: award,
                                },
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
              })
            : awardsEntries.map(([key, awardObj]) => {
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
    </Box>
  );
}

export default AwardTableRenderer;
