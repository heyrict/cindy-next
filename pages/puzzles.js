import React, { useState } from 'react';
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

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];
const puzzleLoadingPanel = (
  <Box width={puzzleWidth}>
    <Panel>Loading...</Panel>
  </Box>
);

const Puzzle = (props, context) => {
  const _ = context.intl.formatMessage;

  const [hasMore, setHasMore] = useState(true);

  return (
    <div>
      <Head>
        <title>{_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Flex flexWrap="wrap">
        <Query query={PuzzlesUnsolvedQuery}>
          {({ loading, error, data }) => {
            if (loading) return puzzleLoadingPanel;
            if (error) return `Error: ${error.message}`;
            if (data && data.sui_hei_puzzle)
              return data.sui_hei_puzzle.map(puzzle => (
                <Box width={puzzleWidth} key={`puzzle-brief-${puzzle.id}`}>
                  <PuzzleBrief puzzle={puzzle} />
                </Box>
              ));
          }}
        </Query>
        <Query query={PuzzleSolvedQuery} variables={{ limit: 20 }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) return puzzleLoadingPanel;
            if (error) return `Error: ${error.message}`;
            if (data && data.sui_hei_puzzle) {
              return (
                <React.Fragment>
                  {data.sui_hei_puzzle.map(puzzle => (
                    <Box width={puzzleWidth} key={`puzzle-brief-${puzzle.id}`}>
                      <PuzzleBrief puzzle={puzzle} />
                    </Box>
                  ))}
                  {hasMore && (
                    <LoadMoreVis
                      wait={0}
                      loadMore={() =>
                        fetchMore({
                          variables: {
                            offset: data.sui_hei_puzzle.length,
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (
                              !fetchMoreResult ||
                              !fetchMoreResult.sui_hei_puzzle
                            )
                              return prev;
                            if (fetchMoreResult.sui_hei_puzzle.length === 0)
                              setHasMore(false);
                            return Object.assign({}, prev, {
                              sui_hei_puzzle: [
                                ...prev.sui_hei_puzzle,
                                ...fetchMoreResult.sui_hei_puzzle,
                              ],
                            });
                          },
                        })
                      }
                    >
                      {puzzleLoadingPanel}
                    </LoadMoreVis>
                  )}
                </React.Fragment>
              );
            }
            return null;
          }}
        </Query>
      </Flex>
    </div>
  );
};

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
