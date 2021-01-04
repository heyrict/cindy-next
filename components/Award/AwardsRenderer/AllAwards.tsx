import React from 'react';
import { toast } from 'react-toastify';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import DelayRendering from 'components/Hoc/DelayRendering';
import AwardTableRenderer from './AwardTableRenderer';

import { Query } from '@apollo/client/react/components';
import { useQuery } from '@apollo/client';
import {
  ALL_AWARDS_QUERY,
} from 'graphql/Queries/Awards';
import { PUZZLE_GENRE_GROUPS_QUERY, PUZZLE_STAR_COUNT_GROUPS_QUERY, USER_MAX_YAMI_DIALOGUE_COUNT_QUERY } from 'graphql/Queries/Puzzles';

import { FormattedMessage, FormattedRelativeTime } from 'react-intl';
import awardsMessages from 'messages/pages/awards';

import { AllAwardsQuery } from 'graphql/Queries/generated/AllAwardsQuery';
import {
  PuzzleCountAwards,
  QuestionCountAwards,
  GoodQuestionCountAwards,
  TrueAnswerCountAwards,
  MixedAwards,
  PuzzleByYamiAwards,
  PuzzleByYamiQuestionsAwards,
  PuzzleByGenreAwards,
  StarByPuzzleAwards,
  StarSumAwards,
  SpecialAwards,
  AgeAwards,
} from 'components/AwardChecker/constants';
import { AllAwardsProps, AwardStatusType } from './types';
import {
  PuzzleStarCountGroupsQuery,
  PuzzleStarCountGroupsQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarCountGroupsQuery';
import {UserMaxYamiDialogueCountQuery, UserMaxYamiDialogueCountQueryVariables} from 'graphql/Queries/generated/UserMaxYamiDialogueCountQuery';
import {PuzzleCountByGenreQuery, PuzzleCountByGenreQueryVariables} from 'graphql/Queries/generated/PuzzleCountByGenreQuery';

const AllAwards = ({ userInfo }: AllAwardsProps) => {
  const { loading, data, error } = useQuery<AllAwardsQuery>(ALL_AWARDS_QUERY, {
    fetchPolicy: 'cache-first',
  });
  if (loading)
    return (
      <Flex flexWrap="wrap">
        <Flex
          alignItems="center"
          justifyContent="center"
          width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]}
          height="400px"
        >
          <Loading />
        </Flex>
      </Flex>
    );
  if (!data || !data.awards) return null;
  if (error) {
    toast.error(error.message);
  }

  const awardsDefs = data.awards;

  const puzzleCount = userInfo && userInfo.puzzleCount;
  const questionCount = userInfo && userInfo.dialogueCount;
  const goodQuestionCount = userInfo && userInfo.goodQuestionCount;
  const trueAnswerCount = userInfo && userInfo.trueAnswerCount;
  const yamiPuzzleCount = userInfo && userInfo.yamiPuzzleCount;

  return (
    <Flex flexWrap="wrap">
      <AwardTableRenderer
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_puzzleCount} />}
        getStatusLabel={awardObj => awardObj}
        awardsObj={PuzzleCountAwards}
        checker={(awardId, count) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

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
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_questionCount} />}
        getStatusLabel={awardObj => awardObj}
        awardsObj={QuestionCountAwards}
        checker={(awardId, count) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

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
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={
          <FormattedMessage {...awardsMessages.group_goodQuestionCount} />
        }
        getStatusLabel={awardObj => awardObj}
        awardsObj={GoodQuestionCountAwards}
        checker={(awardId, count) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

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
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_trueAnswerCount} />}
        getStatusLabel={awardObj => awardObj}
        awardsObj={TrueAnswerCountAwards}
        checker={(awardId, count) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

          if (hasThisAward) {
            return AwardStatusType.GET;
          }
          if (trueAnswerCount && trueAnswerCount >= count) {
            return AwardStatusType.REACH;
          }
          return AwardStatusType.WAIT;
        }}
      />
      <DelayRendering
        loading={
          <Flex
            alignItems="center"
            justifyContent="center"
            width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]}
            height="400px"
          >
            <Loading />
          </Flex>
        }
      >
        {userInfo ? (
          <Query<PuzzleCountByGenreQuery, PuzzleCountByGenreQueryVariables>
            query={PUZZLE_GENRE_GROUPS_QUERY}
            variables={{ userId: userInfo.id }}
          >
            {({ error, data, loading }) => {
              if (error) {
                toast.error(error);
                return null;
              }
              if (!data || !data.puzzleCountByGenre) {
                if (loading) return <Loading centered />;
                return null;
              }
              const groups = data.puzzleCountByGenre;

              return (
                <AwardTableRenderer
                  awardsDefs={awardsDefs}
                  userInfo={userInfo}
                  header={
                    <FormattedMessage
                      {...awardsMessages.group_puzzleGenreCount}
                    />
                  }
                  getStatusLabel={() => null}
                  awardsObj={PuzzleByGenreAwards}
                  checker={(awardId, awardObj) => {
                    const hasThisAward =
                      userInfo &&
                      userInfo.userAwards.findIndex(
                        ua => ua.awardId === awardId,
                      ) >= 0;

                    if (hasThisAward) {
                      return AwardStatusType.GET;
                    }
                    const group = groups.find(
                      grp => grp.genre === awardObj.genre,
                    );
                    if (group && group.puzzleCount >= awardObj.count) {
                      return AwardStatusType.REACH;
                    }
                    return AwardStatusType.WAIT;
                  }}
                />
              );
            }}
          </Query>
        ) : (
          <AwardTableRenderer
            awardsDefs={awardsDefs}
            header={
              <FormattedMessage {...awardsMessages.group_puzzleGenreCount} />
            }
            getStatusLabel={() => null}
            awardsObj={PuzzleByGenreAwards}
            checker={() => AwardStatusType.WAIT}
          />
        )}
      </DelayRendering>
      <DelayRendering
        loading={
          <Flex
            alignItems="center"
            justifyContent="center"
            width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]}
            height="400px"
          >
            <Loading />
          </Flex>
        }
      >
        {userInfo ? (
          <Query<
            PuzzleStarCountGroupsQuery,
            PuzzleStarCountGroupsQueryVariables
          >
            query={PUZZLE_STAR_COUNT_GROUPS_QUERY}
            variables={{ userId: userInfo.id }}
          >
            {({ error, data, loading }) => {
              if (error) {
                toast.error(error);
                return null;
              }
              if (!data) {
                if (loading) return <Loading centered />;
                return null;
              }
              const groups = data.puzzleStarCountGroups;
              let totalStarCount = 0;
              groups.forEach(grp => {
                totalStarCount += grp.group * grp.puzzleCount;
              });

              return (
                <React.Fragment>
                  <AwardTableRenderer
                    awardsDefs={awardsDefs}
                    userInfo={userInfo}
                    header={
                      <FormattedMessage
                        {...awardsMessages.group_puzzleStarCount}
                      />
                    }
                    awardsObj={StarByPuzzleAwards}
                    getStatusLabel={() => null}
                    checker={(awardId, awardObj) => {
                      const hasThisAward =
                        userInfo &&
                        userInfo.userAwards.findIndex(
                          ua => ua.awardId === awardId,
                        ) >= 0;

                      if (hasThisAward) {
                        return AwardStatusType.GET;
                      }
                      const puzzleCount = groups
                        .filter(grp => grp.group >= awardObj.starCount)
                        .reduce((a, b) => a + b.puzzleCount, 0);
                      if (puzzleCount >= awardObj.puzzleCount) {
                        return AwardStatusType.REACH;
                      }
                      return AwardStatusType.WAIT;
                    }}
                  />
                  <AwardTableRenderer
                    awardsDefs={awardsDefs}
                    userInfo={userInfo}
                    header={
                      <FormattedMessage {...awardsMessages.group_starSum} />
                    }
                    getStatusLabel={awardObj => awardObj}
                    awardsObj={StarSumAwards}
                    checker={(awardId, awardObj) => {
                      const hasThisAward =
                        userInfo &&
                        userInfo.userAwards.findIndex(
                          ua => ua.awardId === awardId,
                        ) >= 0;

                      if (hasThisAward) {
                        return AwardStatusType.GET;
                      }

                      if (totalStarCount >= awardObj) {
                        return AwardStatusType.REACH;
                      }
                      return AwardStatusType.WAIT;
                    }}
                  />
                </React.Fragment>
              );
            }}
          </Query>
        ) : (
          <React.Fragment>
            <AwardTableRenderer
              awardsDefs={awardsDefs}
              header={
                <FormattedMessage {...awardsMessages.group_puzzleStarCount} />
              }
              getStatusLabel={() => null}
              awardsObj={StarByPuzzleAwards}
              checker={() => AwardStatusType.WAIT}
            />
            <AwardTableRenderer
              awardsDefs={awardsDefs}
              header={<FormattedMessage {...awardsMessages.group_starSum} />}
              getStatusLabel={awardObj => awardObj}
              awardsObj={StarSumAwards}
              checker={() => AwardStatusType.WAIT}
            />
          </React.Fragment>
        )}
      </DelayRendering>
      <AwardTableRenderer
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_mixed} />}
        getStatusLabel={() => null}
        awardsObj={MixedAwards}
        checker={(awardId, awardObj) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

          if (hasThisAward) {
            return AwardStatusType.GET;
          }
          if (
            questionCount &&
            questionCount >= awardObj.questionCount &&
            puzzleCount &&
            puzzleCount >= awardObj.puzzleCount
          ) {
            return AwardStatusType.REACH;
          }
          return AwardStatusType.WAIT;
        }}
      />
      <AwardTableRenderer
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_yamiPuzzleCount} />}
        getStatusLabel={awardObj => awardObj}
        awardsObj={PuzzleByYamiAwards}
        checker={(awardId, awardObj) => {
          const hasThisAward =
            userInfo &&
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;

          if (hasThisAward) {
            return AwardStatusType.GET;
          }
          if (yamiPuzzleCount && yamiPuzzleCount > awardObj) {
            return AwardStatusType.REACH;
          }
          return AwardStatusType.WAIT;
        }}
      />
      <DelayRendering
        loading={
          <Flex
            alignItems="center"
            justifyContent="center"
            width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]}
            height="400px"
          >
            <Loading />
          </Flex>
        }
      >
        {userInfo ? (
          <Query<UserMaxYamiDialogueCountQuery, UserMaxYamiDialogueCountQueryVariables>
            query={USER_MAX_YAMI_DIALOGUE_COUNT_QUERY}
            variables={{ userId: userInfo.id }}
          >
            {({ error, data, loading }) => {
              if (error) {
                toast.error(error);
                return null;
              }
              if (!data) {
                if (loading) return <Loading centered />;
                return null;
              }
              const count = data.userMaxYamiDialogueCount.dialogueCount;
              return (
                <AwardTableRenderer
                  awardsDefs={awardsDefs}
                  userInfo={userInfo}
                  header={
                    <FormattedMessage
                      {...awardsMessages.group_yamiPuzzleMaxDialoguesCount}
                    />
                  }
                  getStatusLabel={awardObj => awardObj}
                  awardsObj={PuzzleByYamiQuestionsAwards}
                  checker={(awardId, awardObj) => {
                    const hasThisAward =
                      userInfo &&
                      userInfo.userAwards.findIndex(
                        ua => ua.awardId === awardId,
                      ) >= 0;

                    if (hasThisAward) {
                      return AwardStatusType.GET;
                    }
                    if (
                      count &&
                      count > awardObj
                    ) {
                      return AwardStatusType.REACH;
                    }
                    return AwardStatusType.WAIT;
                  }}
                />
              );
            }}
          </Query>
        ) : (
          <AwardTableRenderer
            awardsDefs={awardsDefs}
            header={
              <FormattedMessage
                {...awardsMessages.group_yamiPuzzleMaxDialoguesCount}
              />
            }
            getStatusLabel={awardObj => awardObj}
            awardsObj={PuzzleByYamiAwards}
            checker={() => AwardStatusType.WAIT}
          />
        )}
      </DelayRendering>
      <AwardTableRenderer
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_age} />}
        getStatusLabel={age => (
          <FormattedRelativeTime value={age / 365} unit="year" style="narrow" />
        )}
        awardsObj={AgeAwards}
        checker={(awardId, age) => {
          if (!userInfo) return AwardStatusType.WAIT;

          const hasThisAward =
            userInfo.userAwards.findIndex(ua => ua.awardId === awardId) >= 0;
          if (hasThisAward) return AwardStatusType.GET;

          const {puzzleMaxCreated} = userInfo;

          if (!puzzleMaxCreated) return AwardStatusType.WAIT;

          const userDateJoined = new Date(userInfo.dateJoined);
          const lastPuzzleCreated = new Date(puzzleMaxCreated);
          const daysOfLastPuzzleSinceJoined =
            (lastPuzzleCreated.getTime() - userDateJoined.getTime()) / 86400000;

          if (daysOfLastPuzzleSinceJoined > age) {
            return AwardStatusType.REACH;
          }
          return AwardStatusType.WAIT;
        }}
      />
      <AwardTableRenderer
        awardsDefs={awardsDefs}
        userInfo={userInfo}
        header={<FormattedMessage {...awardsMessages.group_others} />}
        getStatusLabel={() => null}
        awardsObj={SpecialAwards}
        checker={() => AwardStatusType.UNKNOWN}
      />
    </Flex>
  );
};

export default AllAwards;
