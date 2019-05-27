import React from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Query } from 'react-apollo';
import { PuzzlesUnsolvedQuery } from 'graphql/Queries/Puzzles';
import { Heading, Flex, Box } from 'components/General';
import PuzzleBrief from 'components/Puzzle/Brief';

import messages from 'messages/pages/puzzle';

const Puzzle = (props, context) => {
  const _ = context.intl.formatMessage;
  return (
    <div>
      <Head>
        <title>{_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Query query={PuzzlesUnsolvedQuery}>
        {({ loading, error, data }) => {
          return (
            <div>
              {loading && 'Loading...'}
              {error && `Error: ${error.message}`}
              {data && data.sui_hei_puzzle && (
                <Flex flexWrap="wrap">
                  {data.sui_hei_puzzle.map(puzzle => (
                    <Box
                      width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}
                      key={`puzzle-brief-${puzzle.id}`}
                    >
                      <PuzzleBrief puzzle={puzzle} />
                    </Box>
                  ))}
                </Flex>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
