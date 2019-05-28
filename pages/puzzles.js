import React from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Query } from 'react-apollo';
import {
  PuzzlesUnsolvedQuery,
  PuzzleSolvedQuery,
} from 'graphql/Queries/Puzzles';
import { Heading, Flex, Box, Panel } from 'components/General';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
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
        {({ loading, error, data }) => (
          <Flex flexWrap="wrap">
            {loading && 'Loading...'}
            {error && `Error: ${error.message}`}
            {data &&
              data.sui_hei_puzzle &&
              data.sui_hei_puzzle.map(puzzle => (
                <Box
                  width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}
                  key={`puzzle-brief-${puzzle.id}`}
                >
                  <PuzzleBrief puzzle={puzzle} />
                </Box>
              ))}
            <Query query={PuzzleSolvedQuery} variables={{ limit: 10 }}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error: ${error.message}`;
                if (data && data.sui_hei_puzzle) {
                  return (
                    <React.Fragment>
                      {data.sui_hei_puzzle.map(puzzle => (
                        <Box
                          width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}
                          key={`puzzle-brief-${puzzle.id}`}
                        >
                          <PuzzleBrief puzzle={puzzle} />
                        </Box>
                      ))}
                      <LoadMoreVis loadMore={() => console.log('LOAD')}>
                        <Box width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}>
                          <Panel>Loading...</Panel>
                        </Box>
                      </LoadMoreVis>
                    </React.Fragment>
                  );
                }
                return null;
              }}
            </Query>
          </Flex>
        )}
      </Query>
    </div>
  );
};

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
