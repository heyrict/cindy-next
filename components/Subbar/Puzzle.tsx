import React from 'react';

import { FormattedMessage } from 'react-intl';
import puzzlesMessage from 'messages/pages/puzzles';
import addPuzzleMessage from 'messages/pages/add_puzzle';
import rankingMessage from 'messages/pages/ranking';
import awardsMessages from 'messages/pages/awards';
import searchMessages from 'messages/pages/search';
import tagsPageMessages from 'messages/pages/tags';
import commentsPageMessages from 'messages/pages/comments';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Link from 'next/link';

import { StateType } from 'reducers/types';
import { PuzzleSubbarProps } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const PuzzleSubbar = ({ route }: PuzzleSubbarProps) => (
  <Flex flexWrap="wrap" mb={3}>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/puzzles' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/puzzles" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...puzzlesMessage.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/add/puzzle' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/add/puzzle" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...addPuzzleMessage.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/ranking' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/ranking" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...rankingMessage.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/awards' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/awards" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...awardsMessages.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/search' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/search" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...searchMessages.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/tags' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/tags" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...tagsPageMessages.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
    <Box width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]} mb={1}>
      <Box
        bg={route === '/comments' ? 'yellow.4' : 'orange.4'}
        borderRadius={2}
        ml={1}
        p={1}
      >
        <Link href="/comments" passHref>
          <ButtonTransparentA color="light.red.9" height={1} width={1}>
            <FormattedMessage {...commentsPageMessages.header} />
          </ButtonTransparentA>
        </Link>
      </Box>
    </Box>
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  route: globalReducer.rootSelector(state).route,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleSubbar);
