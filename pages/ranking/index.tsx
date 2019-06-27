import React from 'react';
import Head from 'next/head';
import { Link } from 'routes';

import { FormattedMessage, intlShape } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, ButtonTransparent, Box } from 'components/General';
import PuzzleSubbar from 'components/Subbar/Puzzle';

import { RankingProps, RankingContext } from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Ranking = (_props: RankingProps, context: RankingContext) => {
  const _ = context.intl.formatMessage as any;
  return (
    <React.Fragment>
      <Head>
        <title>{_(rankingMessages.title)} | Cindy</title>
        <meta name="description" content={_(rankingMessages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...rankingMessages.header} />
      </Heading>
      <PuzzleSubbar />
      <Flex width={1} flexWrap="wrap">
        <Box width={[1, 1 / 2, 1, 1 / 2]} mb={3}>
          <Box m={2} bg="yellow.7" borderRadius={2}>
            <Link to="ranking/puzzle_star" passHref>
              <ButtonTransparentA
                width={1}
                py={2}
                color="yellow.1"
                textAlign="center"
                minHeight="5em"
                fontSize="1.4em"
              >
                <FormattedMessage {...rankingMessages.puzzleStarRanking} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>
        <Box width={[1, 1 / 2, 1, 1 / 2]} mb={3}>
          <Box m={2} bg="yellow.7" borderRadius={2}>
            <Link to="ranking/user_dialogue" passHref>
              <ButtonTransparentA
                width={1}
                py={2}
                color="yellow.1"
                textAlign="center"
                minHeight="5em"
                fontSize="1.4em"
              >
                <FormattedMessage {...rankingMessages.userDialogueRanking} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>
        <Box width={[1, 1 / 2, 1, 1 / 2]} mb={3}>
          <Box m={2} bg="yellow.7" borderRadius={2}>
            <Link to="ranking/user_puzzle" passHref>
              <ButtonTransparentA
                width={1}
                py={2}
                color="yellow.1"
                textAlign="center"
                minHeight="5em"
                fontSize="1.4em"
              >
                <FormattedMessage {...rankingMessages.userPuzzleRanking} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

Ranking.contextTypes = {
  intl: intlShape,
};

export default Ranking;
