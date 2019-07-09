import React from 'react';
import { toast } from 'react-toastify';

import { Flex, Box, Img, ButtonTransparent } from 'components/General';
import acceptIcon from 'svgs/accept.svg';
import denyIcon from 'svgs/deny.svg';
import plusIcon from 'svgs/plus.svg';

import { Query } from 'react-apollo';
import { ALL_AWARDS_QUERY } from 'graphql/Queries/Awards';

import { FormattedMessage } from 'react-intl';
import awardsMessages from 'messages/pages/awards';

import { AllAwardsQuery } from 'graphql/Queries/generated/AllAwardsQuery';
import {
  PuzzleCountAwards,
  QuestionCountAwards,
  GoodQuestionCountAwards,
  TrueAnswerCountAwards,
} from 'components/AwardChecker/constants';
import CurrentUserAward from 'components/User/CurrentUserAward';
import styled from '@emotion/styled';
import {
  AllAwardsProps,
  AwardStatusType,
  AwardTableRendererProps,
} from './types';

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
      }: AwardTableRendererProps) => (
        <Box width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]} mb={2}>
          <Box textAlign="center" fontSize={2} color="orange.6" width={1}>
            {header}
          </Box>
          <AwardTable>
            <tbody>
              {Object.entries(awardsObj).map(([count, awardId]) => {
                let awardStatusContent = null;
                const award = data.sui_hei_award.find(a => a.id === awardId);
                const awardStatus = checker(parseInt(count, 10), awardId);
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
                        <ButtonTransparent>
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
                if (!award) return null;
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
          </AwardTable>
        </Box>
      );

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
