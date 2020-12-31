import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { maybeSendNotification } from 'common/web-notify';
import { mergeList } from 'common/update';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import messages from 'messages/pages/puzzles';
import webNotifyMessages from 'messages/webNotify';
import puzzleMessages from 'messages/components/puzzle';
import userMessages from 'messages/components/user';

import { useApolloClient } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import {
  PUZZLES_SOLVED_QUERY,
  PUZZLES_UNSOLVED_QUERY,
} from 'graphql/Queries/Puzzles';
import { PUZZLES_UNSOLVED_LIVEQUERY } from 'graphql/LiveQueries/Puzzles';

import { Heading, Flex, Panel } from 'components/General';
import Loading from 'components/General/Loading';
import MultiColBox from 'components/General/MultiColBox';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import PuzzleBrief from 'components/Puzzle/Brief';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import ErrorReload from 'components/General/ErrorReload';

import { PuzzlesUnsolvedLiveQuery } from 'graphql/LiveQueries/generated/PuzzlesUnsolvedLiveQuery';
import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import {
  PuzzlesSolvedRendererProps,
  PuzzlesUnsolvedRendererProps,
} from 'pageTypes';
import { PuzzlesUnsolvedQuery } from 'graphql/Queries/generated/PuzzlesUnsolvedQuery';

const PUZZLES_PER_PAGE = 20;
const puzzleLoadingPanel = (
  <MultiColBox>
    <Panel>
      <Loading centered />
    </Panel>
  </MultiColBox>
);

const PuzzlesSolvedRenderer = ({
  loading,
  error,
  data,
  refetch,
  fetchMore,
}: PuzzlesSolvedRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  // Update first 20 questions upon second+ load
  useEffect(() => {
    if (data && data.puzzle && data.puzzle.length !== 0) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.puzzle) return prev;
          return {
            ...prev,
            puzzle: mergeList(
              prev.puzzle,
              fetchMoreResult.puzzle,
              'id',
              'desc',
            ),
          };
        },
      });
    }
  }, []);

  if (loading && (!data || !data.puzzles || data.puzzles.length === 0))
    return puzzleLoadingPanel;
  if (error) {
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (data && data.puzzles) {
    return (
      <React.Fragment>
        {data.puzzles.map(puzzle => (
          <MultiColBox key={`puzzle-brief-${puzzle.id}`}>
            <PuzzleBrief puzzle={puzzle} />
          </MultiColBox>
        ))}
        {data.puzzles.length >= PUZZLES_PER_PAGE && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.puzzle.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.puzzle) return prev;
                  if (fetchMoreResult.puzzle.length < PUZZLES_PER_PAGE)
                    setHasMore(false);
                  return Object.assign({}, prev, {
                    puzzle: [...prev.puzzle, ...fetchMoreResult.puzzle],
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
  refetch,
  data,
  intl,
  subscribeToMore,
}: PuzzlesUnsolvedRendererProps) => {
  const client = useApolloClient();
  const _ = intl.formatMessage;

  useEffect(() => {
    subscribeToMore<PuzzlesUnsolvedLiveQuery>({
      document: PUZZLES_UNSOLVED_LIVEQUERY,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newUnsolved = subscriptionData.data.puzzle;
        if (prev.puzzle.length > newUnsolved.length) {
          // Puzzles changed from unsolved to other
          const statusChangedPuzzle = {
            ...prev.puzzle.find(
              p => newUnsolved.findIndex(p2 => p2.id === p.id) === -1,
            ),
            stars_aggregate: null,
            bookmarks_aggregate: null,
            comments_aggregate: null,
            status: 1,
          };
          const puzzleSolvedQueryResult = client.readQuery({
            query: PUZZLES_SOLVED_QUERY,
          });
          if (puzzleSolvedQueryResult !== null) {
            const { puzzle } = puzzleSolvedQueryResult;
            client.writeQuery({
              query: PUZZLES_SOLVED_QUERY,
              data: {
                puzzle: [statusChangedPuzzle, ...puzzle],
              },
            });
          }
        }

        if (prev.puzzle.length < newUnsolved.length) {
          // new puzzle added
          let genreMessage = '';
          switch (newUnsolved[0].genre) {
            case 0:
              genreMessage = _(puzzleMessages.genre_classic);
              break;
            case 1:
              genreMessage = _(puzzleMessages.genre_twentyQuestions);
              break;
            case 2:
              genreMessage = _(puzzleMessages.genre_littleAlbat);
              break;
            case 3:
              genreMessage = _(puzzleMessages.genre_others);
              break;
          }
          if (document.hidden) {
            const user = newUnsolved[0].anonymous
              ? _(userMessages.anonymousUser)
              : newUnsolved[0].user.nickname;

            maybeSendNotification(_(webNotifyMessages.newPuzzleAdded), {
              body: _(webNotifyMessages.newPuzzleAddedDetail, {
                user,
                puzzle: newUnsolved[0].title,
                genre: genreMessage,
              }),
              renotify: true,
            });
          }
        }

        return {
          ...prev,
          puzzle: newUnsolved,
        };
      },
    });
  });

  if (loading && (!data || !data.puzzles || data.puzzles.length === 0))
    return puzzleLoadingPanel;
  if (error) {
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (data && data.puzzles)
    return (
      <React.Fragment>
        {data.puzzles.map(puzzle => (
          <MultiColBox key={`puzzle-brief-${puzzle.id}`}>
            <PuzzleBrief puzzle={puzzle} />
          </MultiColBox>
        ))}
      </React.Fragment>
    );
  return null;
};

const Puzzles = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;

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
        <Query<PuzzlesUnsolvedQuery>
          query={PUZZLES_UNSOLVED_QUERY}
          fetchPolicy="cache-and-network"
        >
          {params => <PuzzlesUnsolvedRenderer {...params} intl={intl} />}
        </Query>
        <Query<PuzzlesSolvedQuery, PuzzlesSolvedQueryVariables>
          query={PUZZLES_SOLVED_QUERY}
          variables={{ limit: PUZZLES_PER_PAGE }}
          fetchPolicy="cache-first"
        >
          {params => <PuzzlesSolvedRenderer {...params} />}
        </Query>
      </Flex>
    </React.Fragment>
  );
};

export default injectIntl(Puzzles);
