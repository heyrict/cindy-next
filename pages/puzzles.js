import React, { useState } from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Query, Subscription } from 'react-apollo';
import { PuzzleSolvedQuery } from 'graphql/Queries/Puzzles';
import { PuzzlesUnsolvedLiveQuery } from 'graphql/LiveQueries/Puzzles';
import { Heading, Flex, Box, Panel } from 'components/General';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import PuzzleBrief from 'components/Puzzle/Brief';

import messages from 'messages/pages/puzzles';

let prevData = null;

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];
const puzzleLoadingPanel = (
  <Box width={puzzleWidth}>
    <Panel>Loading...</Panel>
  </Box>
);

const Puzzles = (props, context) => {
  const _ = context.intl.formatMessage;

  const [hasMore, setHasMore] = useState(true);

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Flex flexWrap="wrap">
        <Subscription
          subscription={PuzzlesUnsolvedLiveQuery}
          onSubscriptionData={({ client, subscriptionData }) => {
            if (!subscriptionData.data) return;
            const newUnsolved = subscriptionData.data.sui_hei_puzzle;
            if (prevData && prevData.length > newUnsolved.length) {
              // Puzzles changed from unsolved to other
              const statusChangedPuzzle = {
                ...prevData.find(
                  p => newUnsolved.findIndex(p2 => p2.id === p.id) === -1,
                ),
                sui_hei_stars_aggregate: null,
                sui_hei_bookmarks_aggregate: null,
                sui_hei_comments_aggregate: null,
                status: 1,
              };
              const { sui_hei_puzzle } = client.readQuery({
                query: PuzzleSolvedQuery,
              });
              client.writeQuery({
                query: PuzzleSolvedQuery,
                data: {
                  sui_hei_puzzle: [statusChangedPuzzle, ...sui_hei_puzzle],
                },
              });
            }
            prevData = newUnsolved;
          }}
        >
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
        </Subscription>
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
    </React.Fragment>
  );
};

Puzzles.contextTypes = {
  intl: intlShape,
};

export default Puzzles;
