import React from 'react';

import { FormattedMessage } from 'react-intl';
import userMessages from 'messages/components/user';
import userPageMessages from 'messages/pages/user';
import authMessages from 'messages/components/auth';

import { Flex, Box } from 'components/General';
import ProfileContent from './ProfileContent';
import ProfileUserAwards from './ProfileUserAwards';

import { ProfileInfoProps } from './types';

const infoRowProps = {
  width: 1,
  flexWrap: 'wrap',
};

const infoRowLabelProps = {
  mr: 'auto',
  minWidth: '12em',
};

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const aggregates = {
    puzzleCount:
      user.sui_hei_puzzles_aggregate &&
      user.sui_hei_puzzles_aggregate.aggregate &&
      user.sui_hei_puzzles_aggregate.aggregate.count,
    dialogueCount:
      user.sui_hei_dialogues_aggregate &&
      user.sui_hei_dialogues_aggregate.aggregate &&
      user.sui_hei_dialogues_aggregate.aggregate.count,
    goodQuestionCount:
      user.good_questions_aggregate &&
      user.good_questions_aggregate.aggregate &&
      user.good_questions_aggregate.aggregate.count,
    trueAnswerCount:
      user.true_answers_aggregate &&
      user.true_answers_aggregate.aggregate &&
      user.true_answers_aggregate.aggregate.count,
    commentCount:
      user.sui_hei_comments_aggregate &&
      user.sui_hei_comments_aggregate.aggregate &&
      user.sui_hei_comments_aggregate.aggregate.count,
    starCount:
      user.sui_hei_stars_aggregate &&
      user.sui_hei_stars_aggregate.aggregate &&
      user.sui_hei_stars_aggregate.aggregate.count,
    starSum:
      user.sui_hei_stars_aggregate &&
      user.sui_hei_stars_aggregate.aggregate &&
      user.sui_hei_stars_aggregate.aggregate.sum &&
      user.sui_hei_stars_aggregate.aggregate.sum.value,
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
      <Box width={1} fontSize={4} py={3}>
        <Box mx={1} px={2} py={4} bg="orange.2" borderRadius={2}>
          <FormattedMessage
            {...userPageMessages.profileOf}
            values={{ nickname: user.nickname }}
          />
        </Box>
      </Box>
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
              {aggregates.puzzleCount && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.puzzleCount} />
                  </Box>
                  <Box ml="auto">{aggregates.puzzleCount}</Box>
                </Flex>
              )}
              {aggregates.dialogueCount && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.dialogueCount} />
                  </Box>
                  <Box ml="auto">{aggregates.dialogueCount}</Box>
                </Flex>
              )}
              {aggregates.goodQuestionCount && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.goodQuestionCount} />
                  </Box>
                  <Box ml="auto">{aggregates.goodQuestionCount}</Box>
                </Flex>
              )}
              {aggregates.trueAnswerCount && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.trueAnswerCount} />
                  </Box>
                  <Box ml="auto">{aggregates.trueAnswerCount}</Box>
                </Flex>
              )}
              {aggregates.recvCommentCount && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.recvCommentCount} />
                  </Box>
                  <Box ml="auto">{aggregates.recvCommentCount}</Box>
                </Flex>
              )}
              {aggregates.starCount && aggregates.starSum && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.starCount} />
                  </Box>
                  <Box ml="auto">
                    {aggregates.starCount}({aggregates.starSum})
                  </Box>
                </Flex>
              )}
              {aggregates.recvStarCount && aggregates.recvStarSum && (
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
              currentUserAward={user.sui_hei_current_useraward}
              userAwards={user.sui_hei_userawards}
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
