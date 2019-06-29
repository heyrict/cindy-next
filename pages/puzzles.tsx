import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { mergeList } from 'common/update';

import { FormattedMessage, intlShape, IntlShape } from 'react-intl';
import messages from 'messages/pages/puzzles';

import { Query, Subscription } from 'react-apollo';
import { PUZZLES_SOLVED_QUERY } from 'graphql/Queries/Puzzles';
import { PUZZLES_UNSOLVED_LIVEQUERY } from 'graphql/LiveQueries/Puzzles';

import { Heading, Flex, Box, Panel } from 'components/General';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import PuzzleBrief from 'components/Puzzle/Brief';
import PuzzleSubbar from 'components/Subbar/Puzzle';

import {
  PuzzlesUnsolvedLiveQuery,
  PuzzlesUnsolvedLiveQuery_sui_hei_puzzle,
} from 'graphql/LiveQueries/generated/PuzzlesUnsolvedLiveQuery';
import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import {
  PuzzlesSolvedRendererProps,
  PuzzlesUnsolvedRendererProps,
} from './types';

let prevData: PuzzlesUnsolvedLiveQuery_sui_hei_puzzle[] | null = null;

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];
const puzzleLoadingPanel = (
  <Box width={puzzleWidth}>
    <Panel>Loading...</Panel>
  </Box>
);

const PuzzlesSolvedRenderer = ({
  loading,
  error,
  data,
  fetchMore,
}: PuzzlesSolvedRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (data && data.sui_hei_puzzle && data.sui_hei_puzzle.length !== 0) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.sui_hei_puzzle) return prev;
          return {
            ...prev,
            sui_hei_puzzle: mergeList(
              prev.sui_hei_puzzle,
              fetchMoreResult.sui_hei_puzzle,
              'id',
              'desc',
            ),
          };
        },
      });
    }
  }, []);

  if (
    loading &&
    (!data || !data.sui_hei_puzzle || data.sui_hei_puzzle.length === 0)
  )
    return puzzleLoadingPanel;
  if (error) {
    toast.error(error.message);
    return null;
  }
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
                  if (!fetchMoreResult || !fetchMoreResult.sui_hei_puzzle)
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
};

const PuzzlesUnsolvedRenderer = ({
  loading,
  error,
  data,
}: PuzzlesUnsolvedRendererProps) => {
  if (
    loading &&
    (!data || !data.sui_hei_puzzle || data.sui_hei_puzzle.length === 0)
  )
    return puzzleLoadingPanel;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data && data.sui_hei_puzzle)
    return (
      <React.Fragment>
        {data.sui_hei_puzzle.map(puzzle => (
          <Box width={puzzleWidth} key={`puzzle-brief-${puzzle.id}`}>
            <PuzzleBrief puzzle={puzzle} />
          </Box>
        ))}
      </React.Fragment>
    );
  return null;
};

const Puzzles = (_props: any, context: { intl: IntlShape }) => {
  const _: any = context.intl.formatMessage;

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <PuzzleSubbar />
      <Flex flexWrap="wrap">
        <Subscription<PuzzlesUnsolvedLiveQuery>
          subscription={PUZZLES_UNSOLVED_LIVEQUERY}
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
              const puzzleSolvedQueryResult = client.readQuery({
                query: PUZZLES_SOLVED_QUERY,
              });
              if (puzzleSolvedQueryResult === null) return;
              const { sui_hei_puzzle } = puzzleSolvedQueryResult;
              client.writeQuery({
                query: PUZZLES_SOLVED_QUERY,
                data: {
                  sui_hei_puzzle: [statusChangedPuzzle, ...sui_hei_puzzle],
                },
              });
            }
            prevData = newUnsolved;
          }}
        >
          {params => <PuzzlesUnsolvedRenderer {...params} />}
        </Subscription>
        <Query<PuzzlesSolvedQuery, PuzzlesSolvedQueryVariables>
          query={PUZZLES_SOLVED_QUERY}
          variables={{ limit: 20 }}
          fetchPolicy="cache-first"
        >
          {params => <PuzzlesSolvedRenderer {...params} />}
        </Query>
      </Flex>
    </React.Fragment>
  );
};

Puzzles.contextTypes = {
  intl: intlShape,
};

export default Puzzles;
