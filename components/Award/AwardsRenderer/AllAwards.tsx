import React from 'react';
import { toast } from 'react-toastify';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import DelayRendering from 'components/Hoc/DelayRendering';
import AwardTableRenderer from './AwardTableRenderer';

import { Query } from '@apollo/react-components';
import {
  ALL_AWARDS_QUERY,
  PUZZLE_GENRE_GROUPS_QUERY,
  PUZZLE_STAR_COUNT_GROUPS_QUERY,
} from 'graphql/Queries/Awards';
import { YAMI_PUZZLE_COUNT_QUERY } from 'graphql/Queries/Puzzles';

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
  YamiPuzzleCountQuery,
  YamiPuzzleCountQueryVariables,
} from 'graphql/Queries/generated/YamiPuzzleCountQuery';
import {
  PuzzleGenreGroupsQuery,
  PuzzleGenreGroupsQueryVariables,
} from 'graphql/Queries/generated/PuzzleGenreGroupsQuery';
import {
  PuzzleStarCountGroupsQuery,
  PuzzleStarCountGroupsQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarCountGroupsQuery';

const AllAwards = ({ userInfo }: AllAwardsProps) => (
  <Flex flexWrap="wrap">
    <Query<AllAwardsQuery> query={ALL_AWARDS_QUERY} fetchPolicy="cache-first">
      {({ loading, data, error }) => {
        if (loading)
          return (
            <Flex
              alignItems="center"
              justifyContent="center"
              width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]}
              height="400px"
            >
              <Loading />
            </Flex>
          );
        if (!data || !data.award) return null;
        if (error) {
          toast.error(error.message);
        }

        const awardsDefs = data.award;

        const puzzleCount =
          userInfo &&
          userInfo.puzzles_aggregate.aggregate &&
          userInfo.puzzles_aggregate.aggregate.count &&
          userInfo.puzzles_aggregate.aggregate.count;
        const questionCount =
          userInfo &&
          userInfo.dialogues_aggregate.aggregate &&
          userInfo.dialogues_aggregate.aggregate.count &&
          userInfo.dialogues_aggregate.aggregate.count;
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
        const yamiPuzzleCount =
          userInfo &&
          userInfo.yami_puzzles_aggregate &&
          userInfo.yami_puzzles_aggregate.aggregate &&
          userInfo.yami_puzzles_aggregate.aggregate.count;

        return (
          <React.Fragment>
            <AwardTableRenderer
              awardsDefs={awardsDefs}
              userInfo={userInfo}
              header={
                <FormattedMessage {...awardsMessages.group_puzzleCount} />
              }
              getStatusLabel={awardObj => awardObj}
              awardsObj={PuzzleCountAwards}
              checker={(awardId, count) => {
                const hasThisAward =
                  userInfo &&
                  userInfo.user_awards.findIndex(
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
              awardsDefs={awardsDefs}
              userInfo={userInfo}
              header={
                <FormattedMessage {...awardsMessages.group_questionCount} />
              }
              getStatusLabel={awardObj => awardObj}
              awardsObj={QuestionCountAwards}
              checker={(awardId, count) => {
                const hasThisAward =
                  userInfo &&
                  userInfo.user_awards.findIndex(
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
                  userInfo.user_awards.findIndex(
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
              awardsDefs={awardsDefs}
              userInfo={userInfo}
              header={
                <FormattedMessage {...awardsMessages.group_trueAnswerCount} />
              }
              getStatusLabel={awardObj => awardObj}
              awardsObj={TrueAnswerCountAwards}
              checker={(awardId, count) => {
                const hasThisAward =
                  userInfo &&
                  userInfo.user_awards.findIndex(
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
                <Query<PuzzleGenreGroupsQuery, PuzzleGenreGroupsQueryVariables>
                  query={PUZZLE_GENRE_GROUPS_QUERY}
                  variables={{ userId: userInfo.id }}
                >
                  {({ error, data, loading }) => {
                    if (error) {
                      toast.error(error);
                      return null;
                    }
                    if (!data || !data.user_puzzle_genre_groups) {
                      if (loading) return <Loading centered />;
                      return null;
                    }
                    const groups = data.user_puzzle_genre_groups;

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
                            userInfo.user_awards.findIndex(
                              ua => ua.award_id === awardId,
                            ) >= 0;

                          if (hasThisAward) {
                            return AwardStatusType.GET;
                          }
                          const group = groups.find(
                            grp => grp.group === awardObj.genre,
                          );
                          if (group && group.value >= awardObj.count) {
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
                      {...awardsMessages.group_puzzleGenreCount}
                    />
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
                    if (!data || !data.user_star_groups) {
                      if (loading) return <Loading centered />;
                      return null;
                    }
                    const groups = data.user_star_groups;
                    let starSum = 0;
                    data.user_star_groups.forEach(grp => {
                      starSum += grp.group * grp.value;
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
                              userInfo.user_awards.findIndex(
                                ua => ua.award_id === awardId,
                              ) >= 0;

                            if (hasThisAward) {
                              return AwardStatusType.GET;
                            }
                            const puzzleCount = groups
                              .filter(grp => grp.group >= awardObj.starCount)
                              .reduce((a, b) => a + b.value, 0);
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
                            <FormattedMessage
                              {...awardsMessages.group_starSum}
                            />
                          }
                          getStatusLabel={awardObj => awardObj}
                          awardsObj={StarSumAwards}
                          checker={(awardId, awardObj) => {
                            const hasThisAward =
                              userInfo &&
                              userInfo.user_awards.findIndex(
                                ua => ua.award_id === awardId,
                              ) >= 0;

                            if (hasThisAward) {
                              return AwardStatusType.GET;
                            }

                            if (starSum >= awardObj) {
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
                      <FormattedMessage
                        {...awardsMessages.group_puzzleStarCount}
                      />
                    }
                    getStatusLabel={() => null}
                    awardsObj={StarByPuzzleAwards}
                    checker={() => AwardStatusType.WAIT}
                  />
                  <AwardTableRenderer
                    awardsDefs={awardsDefs}
                    header={
                      <FormattedMessage {...awardsMessages.group_starSum} />
                    }
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
                  userInfo.user_awards.findIndex(
                    ua => ua.award_id === awardId,
                  ) >= 0;

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
              header={
                <FormattedMessage {...awardsMessages.group_yamiPuzzleCount} />
              }
              getStatusLabel={awardObj => awardObj}
              awardsObj={PuzzleByYamiAwards}
              checker={(awardId, awardObj) => {
                const hasThisAward =
                  userInfo &&
                  userInfo.user_awards.findIndex(
                    ua => ua.award_id === awardId,
                  ) >= 0;

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
                <Query<YamiPuzzleCountQuery, YamiPuzzleCountQueryVariables>
                  query={YAMI_PUZZLE_COUNT_QUERY}
                  variables={{ userId: userInfo.id }}
                >
                  {({ error, data, loading }) => {
                    if (error) {
                      toast.error(error);
                      return null;
                    }
                    if (!data || !data.puzzle) {
                      if (loading) return <Loading centered />;
                      return null;
                    }
                    const maxYamiDialogues =
                      data.puzzle.length === 0
                        ? null
                        : data.puzzle[0].dialogues_aggregate;
                    const yamiPuzzleDialogueMaxCount =
                      maxYamiDialogues &&
                      maxYamiDialogues.aggregate &&
                      maxYamiDialogues.aggregate.count;
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
                            userInfo.user_awards.findIndex(
                              ua => ua.award_id === awardId,
                            ) >= 0;

                          if (hasThisAward) {
                            return AwardStatusType.GET;
                          }
                          if (
                            yamiPuzzleDialogueMaxCount &&
                            yamiPuzzleDialogueMaxCount > awardObj
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
                <FormattedRelativeTime
                  value={age / 365}
                  unit="year"
                  style="narrow"
                />
              )}
              awardsObj={AgeAwards}
              checker={(awardId, age) => {
                if (!userInfo) return AwardStatusType.WAIT;

                const hasThisAward =
                  userInfo.user_awards.findIndex(
                    ua => ua.award_id === awardId,
                  ) >= 0;
                if (hasThisAward) return AwardStatusType.GET;

                const puzzlesAggr = userInfo.puzzles_aggregate.aggregate;
                const puzzlesMaxCreated =
                  puzzlesAggr && puzzlesAggr.max && puzzlesAggr.max.created;

                if (!puzzlesMaxCreated) return AwardStatusType.WAIT;

                const userDateJoined = new Date(userInfo.date_joined);
                const lastPuzzleCreated = new Date(puzzlesMaxCreated);
                const daysOfLastPuzzleSinceJoined =
                  (lastPuzzleCreated.getTime() - userDateJoined.getTime()) /
                  86400000;

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
          </React.Fragment>
        );
      }}
    </Query>
  </Flex>
);

export default AllAwards;
