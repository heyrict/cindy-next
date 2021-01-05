import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { maybeSendNotification } from 'common/web-notify';
import { mergeList, upsertMultipleItem } from 'common/update';

import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'messages/pages/puzzles';
import webNotifyMessages from 'messages/webNotify';
import puzzleMessages from 'messages/components/puzzle';
import userMessages from 'messages/components/user';

import { useApolloClient, useQuery } from '@apollo/client';
import {
  PUZZLES_SOLVED_QUERY,
  PUZZLES_UNSOLVED_QUERY,
} from 'graphql/Queries/Puzzles';
import { PUZZLES_UNSOLVED_SUB } from 'graphql/Subscriptions/Puzzles';

import { Heading, Flex, Panel } from 'components/General';
import Loading from 'components/General/Loading';
import MultiColBox from 'components/General/MultiColBox';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import PuzzleBrief from 'components/Puzzle/Brief';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import ErrorReload from 'components/General/ErrorReload';

import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import {
  PuzzlesUnsolvedQuery,
  PuzzlesUnsolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesUnsolvedQuery';
import { PuzzlesUnsolvedSub } from 'graphql/Subscriptions/generated/PuzzlesUnsolvedSub';
import { Status, Genre } from 'generated/globalTypes';
import {UnsolvedPuzzlePuzzleLogsSub} from 'graphql/Subscriptions/generated/UnsolvedPuzzlePuzzleLogsSub';
import {UNSOLVED_PUZZLE_PUZZLE_LOGS_SUB} from 'graphql/Subscriptions/PuzzleLog';
import {PUZZLE_UNSOLVED_EXTRA_FRAGMENT} from 'graphql/Fragments/Puzzles';
import {PuzzleUnsolvedExtra} from 'graphql/Fragments/generated/PuzzleUnsolvedExtra';

const PUZZLES_PER_PAGE = 20;
const puzzleLoadingPanel = (
  <MultiColBox>
    <Panel>
      <Loading centered />
    </Panel>
  </MultiColBox>
);

const PuzzlesSolvedRenderer = () => {
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, refetch, fetchMore } = useQuery<
    PuzzlesSolvedQuery,
    PuzzlesSolvedQueryVariables
  >(PUZZLES_SOLVED_QUERY, {
    variables: { limit: PUZZLES_PER_PAGE },
    fetchPolicy: 'cache-first',
  });

  // Update first 20 questions upon second+ load
  useEffect(() => {
    if (data && data.puzzles && data.puzzles.length !== 0) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.puzzles) return prev;
          return {
            ...prev,
            puzzle: mergeList(
              prev.puzzles,
              fetchMoreResult.puzzles,
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
                  offset: data.puzzles.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.puzzles) return prev;
                  return Object.assign({}, prev, {
                    puzzles: [...prev.puzzles, ...fetchMoreResult.puzzles],
                  });
                },
              })
              .then(({ data }) => {
                  if (data.puzzles.length < PUZZLES_PER_PAGE)
                    setHasMore(false);
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

const PuzzlesUnsolvedRenderer = () => {
  const client = useApolloClient();
  const { formatMessage: _ } = useIntl();

  const { loading, error, refetch, data, subscribeToMore } = useQuery<
    PuzzlesUnsolvedQuery
  >(PUZZLES_UNSOLVED_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() =>
    subscribeToMore<UnsolvedPuzzlePuzzleLogsSub>({
      document: UNSOLVED_PUZZLE_PUZZLE_LOGS_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        const data = subscriptionData.data.unsolvedPuzzleStatsSub;
        if (!data) return prev;

        const { dialogueCount, dialogueCountAnswered, dialogueMaxAnsweredTime } = data;

        client.writeFragment<PuzzleUnsolvedExtra>({
          id: `Puzzle:${data.puzzleId}`,
          fragment: PUZZLE_UNSOLVED_EXTRA_FRAGMENT, 
          data: {
            __typename: "Puzzle",
            dialogueCount,
            dialogueNewCount: dialogueCount - dialogueCountAnswered,
            dialogueMaxAnsweredTime,
          }
        });

        return prev;
      },
    })
  )

  useEffect(() =>
    subscribeToMore<PuzzlesUnsolvedSub>({
      document: PUZZLES_UNSOLVED_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !prev || !prev.puzzles) return prev;

        const newUnsolved = subscriptionData.data.puzzleSub;
        const maxModified = Math.max(
          ...prev.puzzles.map(({ modified }: { modified: string }) =>
            new Date(modified).getTime(),
          ),
        );
        const newModified = newUnsolved
          ? new Date(newUnsolved.data.modified).getTime()
          : null;

        if (newModified && maxModified < newModified) {
          // Update received
          client
            .query<PuzzlesUnsolvedQuery, PuzzlesUnsolvedQueryVariables>({
              query: PUZZLES_UNSOLVED_QUERY,
              variables: {
                since: new Date(maxModified).toISOString(),
              },
              fetchPolicy: "network-only",
            })
            .then(({ data }) => {
              const solvedPuzzles = data.puzzles.filter(
                puzzle => puzzle.status !== Status.UNDERGOING,
              );
              const unsolvedPuzzles = data.puzzles.filter(
                puzzle => puzzle.status === Status.UNDERGOING,
              );

              if (solvedPuzzles.length > 0) {
                // Status Changed
                const puzzleSolvedQueryResult = client.readQuery<
                  PuzzlesSolvedQuery,
                  PuzzlesSolvedQueryVariables
                >({
                  query: PUZZLES_SOLVED_QUERY,
                });
                if (puzzleSolvedQueryResult !== null) {
                  const { puzzles } = puzzleSolvedQueryResult;
                  client.writeQuery({
                    query: PUZZLES_SOLVED_QUERY,
                    data: {
                      puzzle: upsertMultipleItem(
                        puzzles,
                        data.puzzles.map(puzzle => ({
                          ...puzzle,
                          starCount: 0,
                          starSum: 0,
                          bookmarkCount: 0,
                          commentCount: 0,
                        })),
                        'modified',
                        'desc',
                      ),
                    },
                  });
                }
              }

              if (unsolvedPuzzles.length > 0) {
                const puzzleUnsolvedQueryResult = client.readQuery<
                  PuzzlesUnsolvedQuery,
                  PuzzlesUnsolvedQueryVariables
                >({
                  query: PUZZLES_UNSOLVED_QUERY,
                });

                // Notify user that a new puzzle's added
                if (puzzleUnsolvedQueryResult !== null) {
                  const newPuzzles = unsolvedPuzzles.filter(
                    puzzle =>
                      puzzleUnsolvedQueryResult.puzzles.findIndex(
                        p => p.id === puzzle.id,
                      ) > -1,
                  );

                  newPuzzles.forEach(puzzle => {
                    let genreMessage = '';
                    switch (puzzle.genre) {
                      case Genre.CLASSIC:
                        genreMessage = _(puzzleMessages.genre_classic);
                        break;
                      case Genre.TWENTY_QUESTIONS:
                        genreMessage = _(puzzleMessages.genre_twentyQuestions);
                        break;
                      case Genre.LITTLE_ALBAT:
                        genreMessage = _(puzzleMessages.genre_littleAlbat);
                        break;
                      case Genre.OTHERS:
                        genreMessage = _(puzzleMessages.genre_others);
                        break;
                    }
                    if (document.hidden) {
                      const user = puzzle.anonymous
                        ? _(userMessages.anonymousUser)
                        : puzzle.user.nickname;

                      maybeSendNotification(
                        _(webNotifyMessages.newPuzzleAdded),
                        {
                          body: _(webNotifyMessages.newPuzzleAddedDetail, {
                            user,
                            puzzle: puzzle.title,
                            genre: genreMessage,
                          }),
                          renotify: true,
                        },
                      );
                    }
                  });

                  // Updates the original query
                  client.writeQuery<PuzzlesUnsolvedQuery>({
                    query: PUZZLES_UNSOLVED_QUERY,
                    data: {
                      puzzles: upsertMultipleItem(
                        puzzleUnsolvedQueryResult.puzzles,
                        data.puzzles,
                        'modified',
                        'desc',
                      ),
                    },
                  });
                }
              }
            });
        }

        return prev;
      },
    })
  );

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

const Puzzles = () => {
  const { formatMessage: _ } = useIntl();

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
        <PuzzlesUnsolvedRenderer />
        <PuzzlesSolvedRenderer />
      </Flex>
    </React.Fragment>
  );
};

export default Puzzles;
