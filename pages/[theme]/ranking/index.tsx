import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { FormattedMessage, useIntl } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, ButtonTransparent, Box } from 'components/General';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import { GetStaticProps } from 'next';
import { themeStaticPaths } from 'theme';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Ranking = () => {
  const { formatMessage: _ } = useIntl();

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
      <Flex
        py={2}
        my={2}
        border="1em double"
        borderColor="orange.6"
        bg="orange.4"
        justifyContent="center"
      >
        <Box fontSize={4}>
          <FormattedMessage {...rankingMessages.monthlyRanking} />
        </Box>
      </Flex>
      <Flex width={1} flexWrap="wrap">
        <Box width={[1, 1 / 2, 1, 1 / 2]} mb={3}>
          <Box m={2} bg="yellow.7" borderRadius={2}>
            <Link href="ranking/puzzleStar" passHref>
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
            <Link href="ranking/userDialogue" passHref>
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
            <Link href="ranking/userPuzzle" passHref>
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

export const getStaticPaths = themeStaticPaths;

export const getStaticProps: GetStaticProps = async ctx => ({
  props: {
    serverSideContext: {
      route: '/ranking',
      theme: ctx.params?.theme,
    },
  },
});

export default Ranking;
