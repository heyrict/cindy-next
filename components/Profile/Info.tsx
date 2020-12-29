import React from 'react';

import { FormattedMessage, FormattedDate } from 'react-intl';
import userMessages from 'messages/components/user';
import authMessages from 'messages/components/auth';

import { Flex, Box } from 'components/General';
import ProfileContent from './ProfileContent';
import ProfileUserAwards from './ProfileUserAwards';

import { ProfileInfoProps } from './types';

const infoRowProps = {
  width: 1,
  flexWrap: 'wrap' as 'wrap',
};

const infoRowLabelProps = {
  mr: 'auto',
  minWidth: '12em',
};

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const aggregates = {
    puzzleCount:
      user.puzzles_aggregate &&
      user.puzzles_aggregate.aggregate &&
      user.puzzles_aggregate.aggregate.count,
    dialogueCount:
      user.dialogues_aggregate &&
      user.dialogues_aggregate.aggregate &&
      user.dialogues_aggregate.aggregate.count,
    goodQuestionCount:
      user.good_questions_aggregate &&
      user.good_questions_aggregate.aggregate &&
      user.good_questions_aggregate.aggregate.count,
    trueAnswerCount:
      user.true_answers_aggregate &&
      user.true_answers_aggregate.aggregate &&
      user.true_answers_aggregate.aggregate.count,
    commentCount:
      user.comments_aggregate &&
      user.comments_aggregate.aggregate &&
      user.comments_aggregate.aggregate.count,
    starCount:
      user.stars_aggregate &&
      user.stars_aggregate.aggregate &&
      user.stars_aggregate.aggregate.count,
    starSum:
      user.stars_aggregate &&
      user.stars_aggregate.aggregate &&
      user.stars_aggregate.aggregate.sum &&
      user.stars_aggregate.aggregate.sum.value,
    recvCommentCount:
      user.received_comments_aggregate &&
      user.received_comments_aggregate.aggregate &&
      user.received_comments_aggregate.aggregate.count,
    recvStarCount:
      user.received_stars_aggregate &&
      user.received_stars_aggregate.aggregate &&
      user.received_stars_aggregate.aggregate.count,
    recvStarSum:
      user.received_stars_aggregate &&
      user.received_stars_aggregate.aggregate &&
      user.received_stars_aggregate.aggregate.sum &&
      user.received_stars_aggregate.aggregate.sum.value,
  };

  return (
    <React.Fragment>
      <Flex flexWrap="wrap" alignItems="flex-start">
        <Box width={[1, 1 / 3, 1, 1 / 3]} mx={['auto', 0, 'auto', 0]} my={1}>
          <Flex
            width={[3 / 5, 'auto', 3 / 5, 'auto']}
            border="5px solid"
            borderRadius={1}
            borderColor="blue.5"
            bg="blue.1"
            mx={['auto', 1, 'auto', 1]}
            my={2}
            py={2}
          >
            <Flex width={1} px={[1, 2, 1, 2]} mx={1} flexWrap="wrap">
              <Flex {...infoRowProps}>
                <Box mr="auto" minWidth="8em">
                  <FormattedMessage {...authMessages.nickname} />
                </Box>
                <Box ml="auto">{user.nickname}</Box>
              </Flex>
              <Flex {...infoRowProps}>
                <Box mr="auto" minWidth="8em">
                  <FormattedMessage {...authMessages.date_joined} />
                </Box>
                <Box ml="auto">
                  <FormattedDate
                    year="numeric"
                    month="short"
                    day="numeric"
                    hour="numeric"
                    minute="numeric"
                    value={user.date_joined}
                  />
                </Box>
              </Flex>
              {user.last_login && (
                <Flex {...infoRowProps}>
                  <Box mr="auto" minWidth="8em">
                    <FormattedMessage {...authMessages.last_login} />
                  </Box>
                  <Box ml="auto">
                    <FormattedDate
                      year="numeric"
                      month="short"
                      day="numeric"
                      hour="numeric"
                      minute="numeric"
                      value={user.last_login}
                    />
                  </Box>
                </Flex>
              )}
              {typeof aggregates.puzzleCount === 'number' && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.puzzleCount} />
                  </Box>
                  <Box ml="auto">{aggregates.puzzleCount}</Box>
                </Flex>
              )}
              {typeof aggregates.dialogueCount === 'number' && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.dialogueCount} />
                  </Box>
                  <Box ml="auto">{aggregates.dialogueCount}</Box>
                </Flex>
              )}
              {typeof aggregates.goodQuestionCount === 'number' && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.goodQuestionCount} />
                  </Box>
                  <Box ml="auto">{aggregates.goodQuestionCount}</Box>
                </Flex>
              )}
              {typeof aggregates.trueAnswerCount === 'number' && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.trueAnswerCount} />
                  </Box>
                  <Box ml="auto">{aggregates.trueAnswerCount}</Box>
                </Flex>
              )}
              {typeof aggregates.recvCommentCount === 'number' && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.recvCommentCount} />
                  </Box>
                  <Box ml="auto">{aggregates.recvCommentCount}</Box>
                </Flex>
              )}
              {typeof aggregates.starCount === 'number' && aggregates.starSum && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.starCount} />
                  </Box>
                  <Box ml="auto">
                    {aggregates.starCount}({aggregates.starSum})
                  </Box>
                </Flex>
              )}
              {typeof aggregates.recvStarCount === 'number' &&
                aggregates.recvStarSum && (
                  <Flex {...infoRowProps}>
                    <Box {...infoRowLabelProps}>
                      <FormattedMessage {...userMessages.recvStarCount} />
                    </Box>
                    <Box ml="auto">
                      {aggregates.recvStarCount}({aggregates.recvStarSum})
                    </Box>
                  </Flex>
                )}
            </Flex>
          </Flex>
          <Flex mx={1} my={2} py={2}>
            <ProfileUserAwards
              currentUserAward={user.current_user_award}
              userAwards={user.user_awards}
              userId={user.id}
            />
          </Flex>
        </Box>
        <Flex width={[1, 2 / 3, 1, 2 / 3]} flexWrap="wrap">
          <ProfileContent userId={user.id} profile={user.profile} />
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default ProfileInfo;
