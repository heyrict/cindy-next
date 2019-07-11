import React from 'react';

import { FormattedMessage } from 'react-intl';
import puzzlesMessage from 'messages/pages/puzzles';
import addPuzzleMessage from 'messages/pages/add_puzzle';
import rankingMessage from 'messages/pages/ranking';
import awardsMessages from 'messages/pages/awards';
import searchMessages from 'messages/pages/search';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Flex, Box, ButtonTransparent } from 'components/General';
import { Link } from 'routes';

import { StateType } from 'reducers/types';
import { PuzzleSubbarProps } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const PuzzleSubbar = ({ route }: PuzzleSubbarProps) => (
  <Flex flexWrap="wrap" mb={3}>
    <Box
      width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]}
      bg={route === '/puzzles' ? 'yellow.4' : 'orange.4'}
      borderRadius={2}
      mx={1}
      p={1}
    >
      <Link to="puzzles" prefetch passHref>
        <ButtonTransparentA color="red.9" height={1} width={1}>
          <FormattedMessage {...puzzlesMessage.header} />
        </ButtonTransparentA>
      </Link>
    </Box>
    <Box
      width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]}
      bg={route === '/add/puzzle' ? 'yellow.4' : 'orange.4'}
      borderRadius={2}
      mr={1}
      p={1}
    >
      <Link to="add/puzzle" prefetch passHref>
        <ButtonTransparentA color="red.9" height={1} width={1}>
          <FormattedMessage {...addPuzzleMessage.header} />
        </ButtonTransparentA>
      </Link>
    </Box>
    <Box
      width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]}
      bg={route === '/ranking' ? 'yellow.4' : 'orange.4'}
      borderRadius={2}
      mr={1}
      p={1}
    >
      <Link to="ranking" prefetch passHref>
        <ButtonTransparentA color="red.9" height={1} width={1}>
          <FormattedMessage {...rankingMessage.header} />
        </ButtonTransparentA>
      </Link>
    </Box>
    <Box
      width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]}
      bg={route === '/awards' ? 'yellow.4' : 'orange.4'}
      borderRadius={2}
      mr={1}
      p={1}
    >
      <Link to="awards" prefetch passHref>
        <ButtonTransparentA color="red.9" height={1} width={1}>
          <FormattedMessage {...awardsMessages.header} />
        </ButtonTransparentA>
      </Link>
    </Box>
    <Box
      width={[1 / 3, 1 / 5, 1 / 6, 1 / 8]}
      bg={route === '/search' ? 'yellow.4' : 'orange.4'}
      borderRadius={2}
      mr={1}
      p={1}
    >
      <Link to="search" prefetch passHref>
        <ButtonTransparentA color="red.9" height={1} width={1}>
          <FormattedMessage {...searchMessages.header} />
        </ButtonTransparentA>
      </Link>
    </Box>
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  route: globalReducer.rootSelector(state).route,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleSubbar);
