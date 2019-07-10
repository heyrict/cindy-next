import React from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';

import { Flex, Box, Img, ButtonTransparent } from 'components/General';
import acceptIcon from 'svgs/accept.svg';
import denyIcon from 'svgs/deny.svg';
import plusIcon from 'svgs/plus.svg';

import { Query, Mutation } from 'react-apollo';
import { ALL_AWARDS_QUERY, AWARDS_INFO_QUERY } from 'graphql/Queries/Awards';
import { ADD_AWARD_MUTATION } from 'graphql/Mutations/Award';

import { FormattedMessage } from 'react-intl';
import awardsMessages from 'messages/pages/awards';
import awardCheckMessages from 'messages/components/awardCheck';

import { AllAwardsQuery } from 'graphql/Queries/generated/AllAwardsQuery';
import {
  PuzzleCountAwards,
  QuestionCountAwards,
  GoodQuestionCountAwards,
  TrueAnswerCountAwards,
} from 'components/AwardChecker/constants';
import CurrentUserAward from 'components/User/CurrentUserAward';
import {
  AllAwardsProps,
  AwardStatusType,
  AwardTableRendererProps,
} from './types';
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

const AllAwards = ({ userInfo }: AllAwardsProps) => (
  <Query<AllAwardsQuery> query={ALL_AWARDS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <span>Loading...</span>;
      if (!data || !data.sui_hei_award) return null;
      if (error) {
        toast.error(error.message);
      }

      const AwardTableRenderer = ({
        awardsObj,
        header,
        checker,
      }: AwardTableRendererProps) =>
        userInfo ? (
          <Box width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]} mb={2}>
            <Box textAlign="center" fontSize={2} color="orange.6" width={1}>
              {header}
            </Box>
            <AwardTable>
              <Mutation<AddAwardMutation, AddAwardMutationVariables>
                mutation={ADD_AWARD_MUTATION}
              >
                {addAward => (
                  <tbody>
                    {Object.entries(awardsObj).map(([count, awardId]) => {
                      let awardStatusContent = null;
                      const award = data.sui_hei_award.find(
                        a => a.id === awardId,
                      );
                      const awardStatus = checker(parseInt(count, 10), awardId);
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
                                      insert_sui_hei_useraward: {
                                        __typename:
                                          'sui_hei_useraward_mutation_response',
                                        returning: [
                                          {
                                            __typename: 'sui_hei_useraward',
                                            id: -1,
                                            created: new Date().toISOString(),
                                            sui_hei_award: award,
                                          },
                                        ],
                                      },
                                    },
                                    update: (proxy, { data }) => {
                                      if (
                                        !data ||
                                        !data.insert_sui_hei_useraward
                                      )
                                        return;
                                      const newUserAward =
                                        data.insert_sui_hei_useraward.returning;
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
                                        awardsInfoResult.sui_hei_user_by_pk
                                      )
                                        proxy.writeQuery({
                                          query: AWARDS_INFO_QUERY,
                                          variables: {
                                            userId: userInfo.id,
                                          },
                                          data: {
                                            ...awardsInfoResult,
                                            sui_hei_user_by_pk: {
                                              ...awardsInfoResult.sui_hei_user_by_pk,
                                              sui_hei_userawards: awardsInfoResult.sui_hei_user_by_pk.sui_hei_userawards.concat(
                                                {
                                                  __typename:
                                                    'sui_hei_useraward',
                                                  id: newUserAward[0].id,
                                                  award_id:
                                                    newUserAward[0]
                                                      .sui_hei_award.id,
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
                          <td>{count}</td>
                          <td>
                            <CurrentUserAward
                              useraward={{
                                id: -1,
                                sui_hei_award: award,
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
          </Box>
        ) : null;

      const puzzleCount =
        userInfo &&
        userInfo.sui_hei_puzzles_aggregate.aggregate &&
        userInfo.sui_hei_puzzles_aggregate.aggregate.count &&
        userInfo.sui_hei_puzzles_aggregate.aggregate.count;
      const questionCount =
        userInfo &&
        userInfo.sui_hei_dialogues_aggregate.aggregate &&
        userInfo.sui_hei_dialogues_aggregate.aggregate.count &&
        userInfo.sui_hei_dialogues_aggregate.aggregate.count;
      const goodQuestionCount =
        userInfo &&
        userInfo.good_questions_aggregate.aggregate &&
        userInfo.good_questions_aggregate.aggregate.count &&
        userInfo.good_questions_aggregate.aggregate.count;
      const trueAnswerCount =
        userInfo &&
        userInfo.true_answers_aggregate.aggregate &&
        userInfo.true_answers_aggregate.aggregate.count &&
        userInfo.true_answers_aggregate.aggregate.count;

      return (
        <Flex flexWrap="wrap">
          <AwardTableRenderer
            header={<FormattedMessage {...awardsMessages.group_puzzleCount} />}
            awardsObj={PuzzleCountAwards}
            checker={(count, awardId) => {
              const hasThisAward =
                userInfo &&
                userInfo.sui_hei_userawards.findIndex(
                  ua => ua.award_id === awardId,
                ) >= 0;

              if (hasThisAward) {
                return AwardStatusType.GET;
              }
              if (puzzleCount && puzzleCount >= count) {
                return AwardStatusType.REACH;
              }
              return AwardStatusType.WAIT;
            }}
          />
          <AwardTableRenderer
            header={
              <FormattedMessage {...awardsMessages.group_questionCount} />
            }
            awardsObj={QuestionCountAwards}
            checker={(count, awardId) => {
              const hasThisAward =
                userInfo &&
                userInfo.sui_hei_userawards.findIndex(
                  ua => ua.award_id === awardId,
                ) >= 0;

              if (hasThisAward) {
                return AwardStatusType.GET;
              }
              if (questionCount && questionCount >= count) {
                return AwardStatusType.REACH;
              }
              return AwardStatusType.WAIT;
            }}
          />
          <AwardTableRenderer
            header={
              <FormattedMessage {...awardsMessages.group_goodQuestionCount} />
            }
            awardsObj={GoodQuestionCountAwards}
            checker={(count, awardId) => {
              const hasThisAward =
                userInfo &&
                userInfo.sui_hei_userawards.findIndex(
                  ua => ua.award_id === awardId,
                ) >= 0;

              if (hasThisAward) {
                return AwardStatusType.GET;
              }
              if (goodQuestionCount && goodQuestionCount >= count) {
                return AwardStatusType.REACH;
              }
              return AwardStatusType.WAIT;
            }}
          />
          <AwardTableRenderer
            header={
              <FormattedMessage {...awardsMessages.group_trueAnswerCount} />
            }
            awardsObj={TrueAnswerCountAwards}
            checker={(count, awardId) => {
              const hasThisAward =
                userInfo &&
                userInfo.sui_hei_userawards.findIndex(
                  ua => ua.award_id === awardId,
                ) >= 0;

              if (hasThisAward) {
                return AwardStatusType.GET;
              }
              if (trueAnswerCount && trueAnswerCount >= count) {
                return AwardStatusType.REACH;
              }
              return AwardStatusType.WAIT;
            }}
          />
        </Flex>
      );
    }}
  </Query>
);

export default AllAwards;
