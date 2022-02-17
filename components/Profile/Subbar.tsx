import React from 'react';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { ProfileSubbarProps, ProfileTabType } from './types';

const ProfileSubbar = ({ tab, setTab, hideBookmark }: ProfileSubbarProps) => (
  <Flex flexWrap="wrap" mb={3}>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={tab === ProfileTabType.INFO ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
      >
        <ButtonTransparent
          color="light.red.9"
          height={1}
          width={1}
          onClick={() => setTab(ProfileTabType.INFO)}
        >
          <FormattedMessage {...userPageMessages.tab_info} />
        </ButtonTransparent>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={tab === ProfileTabType.FOOTPRINTS ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
      >
        <ButtonTransparent
          color="light.red.9"
          height={1}
          width={1}
          onClick={() => setTab(ProfileTabType.FOOTPRINTS)}
        >
          <FormattedMessage {...userPageMessages.tab_footprints} />
        </ButtonTransparent>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={tab === ProfileTabType.PUZZLES ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
      >
        <ButtonTransparent
          color="light.red.9"
          height={1}
          width={1}
          onClick={() => setTab(ProfileTabType.PUZZLES)}
        >
          <FormattedMessage {...userPageMessages.tab_puzzles} />
        </ButtonTransparent>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={tab === ProfileTabType.STARS ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
      >
        <ButtonTransparent
          color="light.red.9"
          height={1}
          width={1}
          onClick={() => setTab(ProfileTabType.STARS)}
        >
          <FormattedMessage {...puzzleMessages.star} />
        </ButtonTransparent>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={tab === ProfileTabType.COMMENTS ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
      >
        <ButtonTransparent
          color="light.red.9"
          height={1}
          width={1}
          onClick={() => setTab(ProfileTabType.COMMENTS)}
        >
          <FormattedMessage {...puzzleMessages.comment} />
        </ButtonTransparent>
      </Box>
    </Box>
    {!hideBookmark && (
      <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
        <Box
          bg={tab === ProfileTabType.BOOKMARKS ? 'yellow.4' : 'orange.4'}
          borderRadius={2}
          ml={1}
        >
          <ButtonTransparent
            color="light.red.9"
            height={1}
            width={1}
            onClick={() => setTab(ProfileTabType.BOOKMARKS)}
          >
            <FormattedMessage {...puzzleMessages.bookmark} />
          </ButtonTransparent>
        </Box>
      </Box>
    )}
  </Flex>
);

export default ProfileSubbar;
