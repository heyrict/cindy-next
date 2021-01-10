import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'theme/styled';
import { FormattedMessage, useIntl } from 'react-intl';
import { line2md } from 'common/markdown';
import { Flex, Box, LinkButton, Img } from 'components/General';
import PuzzleShowcase from 'components/Showcase/Puzzle';
import logoInline from 'svgs/logoInlineLight.svg';

import messages from 'messages/pages/home';

const PurpleBg = styled(Flex)`
  background: linear-gradient(
    ${p => p.theme.colors.red[9]},
    ${p => p.theme.colors.red[8]}
  );
`;

const H1 = styled.h1`
  color: ${p => p.theme.colors.orange[4]};
  font-family: inconsolata, consolas, arial;
  font-size: 3.8em;
  ${p => p.theme.mediaQueries.medium} {
    font-size: 3.2em;
  }
  ${p => p.theme.mediaQueries.small} {
    font-size: 2.6em;
  }
`;

const IntroBox = styled(Box)`
  border-radius: 10px;
  background: ${p => p.theme.colors.orange[4]};
  line-height: 1.5em;
  font-size: 1.8em;
  align-self: center;
  ${p => p.theme.mediaQueries.medium} {
    font-size: 1.5em;
  }
  ${p => p.theme.mediaQueries.small} {
    font-size: 1.3em;
  }
`;

const StartBox = styled(LinkButton)`
  font-weight: bold;
  width: 100%;
  margin: 0 1em;
  color: ${p => p.theme.colors.red[9]};
  background: ${p => p.theme.colors.orange[4]};
  border-radius: 10px;
  text-align: center;
  font-size: 3em;
  &:active,
  &:hover {
    color: ${p => p.theme.colors.orange[4]};
    background: ${p => p.theme.colors.red[9]};
  }
  ${p => p.theme.mediaQueries.medium} {
    font-size: 2.6em;
  }
  ${p => p.theme.mediaQueries.small} {
    font-size: 2em;
  }
`;

const HomePage = () => {
  const { formatMessage: _ } = useIntl();
  return (
    <PurpleBg flexWrap="wrap" pb={4}>
      <Head>
        <title>Cindy - {_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Flex width={1} justifyContent="center">
        <H1>
          <FormattedMessage
            {...messages.header}
            values={{ cindy: <Img src={logoInline} height="md" alt="Cindy" /> }}
          />
        </H1>
      </Flex>
      <Flex width={1} mx={1} pt={20} pb={20}>
        <IntroBox width={[0.7, 0.75, 0.78]} m={20} p={10}>
          <FormattedMessage {...messages.body}>
            {(msg: string) => (
              <div dangerouslySetInnerHTML={{ __html: line2md(msg) }} />
            )}
          </FormattedMessage>
        </IntroBox>
        <Flex alignItems="center" width={[0.3, 0.25, 0.22]}>
          <img
            style={{ width: '100%' }}
            src="/static/images/cindychan.png"
            alt="Mrs. Cindy"
          />
        </Flex>
      </Flex>
      <Link href="/puzzles" passHref>
        <StartBox>
          <FormattedMessage {...messages.start} />
        </StartBox>
      </Link>
      <Box
        bg="orange.3"
        borderRadius={2}
        p={2}
        mt={4}
        mx={2}
        width={1}
        minHeight="700px"
      >
        <PuzzleShowcase />
      </Box>
    </PurpleBg>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default HomePage;
