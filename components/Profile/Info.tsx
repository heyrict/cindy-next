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

const ProfileInfo = ({ user }: ProfileInfoProps) => (
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
                <FormattedMessage {...authMessages.dateJoined} />
              </Box>
              <Box ml="auto">
                <FormattedDate
                  year="numeric"
                  month="short"
                  day="numeric"
                  hour="numeric"
                  minute="numeric"
                  value={user.dateJoined}
                />
              </Box>
            </Flex>
            {user.lastLogin && (
              <Flex {...infoRowProps}>
                <Box mr="auto" minWidth="8em">
                  <FormattedMessage {...authMessages.lastLogin} />
                </Box>
                <Box ml="auto">
                  <FormattedDate
                    year="numeric"
                    month="short"
                    day="numeric"
                    hour="numeric"
                    minute="numeric"
                    value={user.lastLogin}
                  />
                </Box>
              </Flex>
            )}
            {typeof user.puzzleCount === 'number' && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.puzzleCount} />
                </Box>
                <Box ml="auto">{user.puzzleCount}</Box>
              </Flex>
            )}
            {typeof user.dialogueCount === 'number' && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.dialogueCount} />
                </Box>
                <Box ml="auto">{user.dialogueCount}</Box>
              </Flex>
            )}
            {typeof user.goodQuestionCount === 'number' && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.goodQuestionCount} />
                </Box>
                <Box ml="auto">{user.goodQuestionCount}</Box>
              </Flex>
            )}
            {typeof user.trueAnswerCount === 'number' && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.trueAnswerCount} />
                </Box>
                <Box ml="auto">{user.trueAnswerCount}</Box>
              </Flex>
            )}
            {typeof user.receivedCommentCount === 'number' && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.recvCommentCount} />
                </Box>
                <Box ml="auto">{user.receivedCommentCount}</Box>
              </Flex>
            )}
            {typeof user.starCount === 'number' && user.starSum && (
              <Flex {...infoRowProps}>
                <Box {...infoRowLabelProps}>
                  <FormattedMessage {...userMessages.starCount} />
                </Box>
                <Box ml="auto">
                  {user.starCount}({user.starSum})
                </Box>
              </Flex>
            )}
            {typeof user.receivedStarCount === 'number' &&
              user.receivedStarSum && (
                <Flex {...infoRowProps}>
                  <Box {...infoRowLabelProps}>
                    <FormattedMessage {...userMessages.recvStarCount} />
                  </Box>
                  <Box ml="auto">
                    {user.receivedStarCount}({user.receivedStarSum})
                  </Box>
                </Flex>
              )}
          </Flex>
        </Flex>
        <Flex mx={1} my={2} py={2}>
          <ProfileUserAwards
            currentUserAward={user.currentAward}
            userAwards={user.userAwards}
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

export default ProfileInfo;
