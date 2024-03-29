import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { maybeSendNotification } from 'common/web-notify';
import { mergeList, upsertMultipleItem } from 'common/update';

import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'messages/pages/puzzles';
import webNotifyMessages from 'messages/webNotify';
import puzzleMessages from 'messages/components/puzzle';
import userMessages from 'messages/components/user';

import { ApolloClient, useApolloClient, useQuery } from '@apollo/client';
import { initializeApollo } from 'lib/apollo';
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
import { UnsolvedPuzzlePuzzleLogsSub } from 'graphql/Subscriptions/generated/UnsolvedPuzzlePuzzleLogsSub';
import { UNSOLVED_PUZZLE_PUZZLE_LOGS_SUB } from 'graphql/Subscriptions/PuzzleLog';
import {
  PUZZLE_AGGREGATE_FRAGMENT,
  PUZZLE_SHARED_FRAGMENT,
  PUZZLE_UNSOLVED_EXTRA_FRAGMENT,
} from 'graphql/Fragments/Puzzles';
import { PuzzleUnsolvedExtra } from 'graphql/Fragments/generated/PuzzleUnsolvedExtra';
import { matchGqlArgs, parseGqlArgs } from 'common/graphql';

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
            puzzles: mergeList(
              prev.puzzles || [],
              fetchMoreResult.puzzles || [],
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
              }).then(({ data }) => {
                if (data.puzzles.length < PUZZLES_PER_PAGE) setHasMore(false);
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

  const { loading, error, refetch, data, subscribeToMore } =
    useQuery<PuzzlesUnsolvedQuery>(PUZZLES_UNSOLVED_QUERY, {
      fetchPolicy: 'cache-and-network',
    });

  useEffect(
    () =>
      subscribeToMore<UnsolvedPuzzlePuzzleLogsSub>({
        document: UNSOLVED_PUZZLE_PUZZLE_LOGS_SUB,
        updateQuery: (prev, { subscriptionData }) => {
          const data = subscriptionData.data.unsolvedPuzzleStatsSub;
          if (!data) return prev;

          const {
            dialogueCount,
            dialogueCountAnswered,
            dialogueMaxAnsweredTime,
          } = data;

          const prevFrag: Partial<PuzzleUnsolvedExtra> = client.readFragment<PuzzleUnsolvedExtra | null>({
            id: `Puzzle:${data.puzzleId}`,
            fragment: PUZZLE_UNSOLVED_EXTRA_FRAGMENT,
          }) || {};

          client.writeFragment<PuzzleUnsolvedExtra>({
            id: `Puzzle:${data.puzzleId}`,
            fragment: PUZZLE_UNSOLVED_EXTRA_FRAGMENT,
            data: {
              ...prevFrag,
              __typename: 'Puzzle',
              dialogueCount,
              dialogueNewCount: dialogueCount - dialogueCountAnswered,
              // Server may return null dialogueMaxAnsweredTime if not updated
              dialogueMaxAnsweredTime: dialogueMaxAnsweredTime || prevFrag.dialogueMaxAnsweredTime,
            },
          });

          return (
            client.readQuery<PuzzlesUnsolvedQuery>({
              query: PUZZLES_UNSOLVED_QUERY,
            }) || prev
          );
        },
      }),
    [],
  );

  useEffect(
    () =>
      subscribeToMore<PuzzlesUnsolvedSub>({
        document: PUZZLES_UNSOLVED_SUB,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !prev || !prev.puzzles) return prev;

          const newUnsolved = subscriptionData.data.puzzleSub?.data;
          const maxModified = Math.max(
            ...prev.puzzles.map(({ modified }: { modified: string }) =>
              new Date(modified).getTime(),
            ),
          );
          if (!newUnsolved) return prev;
          const newModified = new Date(newUnsolved.modified).getTime();

          if (newUnsolved.status !== Status.UNDERGOING) {
            // Puzzle status changed
            // (`modified` is unreliable for status change as cache updates it
            // before updateQuery)

            // Move puzzle from unsolved -> solved list
            // 1. Add puzzle to solved list as a side effect
            client.cache.modify({
              fields: {
                puzzles: (prev: any[], { storeFieldName, readField }) => {
                  const gqlArgs = parseGqlArgs(storeFieldName);
                  if (
                    matchGqlArgs(gqlArgs, {
                      // PUZZLES_UNSOLVED_QUERY
                      order: { id: 'DESC' },
                      filter: { modified: {}, status: { eq: 'UNDERGOING' } },
                    })
                  ) {
                    return prev;
                  }
                  if (
                    matchGqlArgs(gqlArgs, {
                      // PUZZLES_SOLVED_QUERY
                      order: { modified: 'DESC' },
                      filter: {
                        status: { neAll: ['UNDERGOING', 'FORCE_HIDDEN'] },
                      },
                    })
                  ) {
                    const newUnsolvedData: any = client.cache.readFragment({
                      fragment: PUZZLE_SHARED_FRAGMENT,
                      fragmentName: 'PuzzleShared',
                      id: `Puzzle:${newUnsolved.id}`,
                    });
                    const newUnsolvedExtra: any = client.cache.readFragment({
                      fragment: PUZZLE_UNSOLVED_EXTRA_FRAGMENT,
                      fragmentName: 'PuzzleUnsolvedExtra',
                      id: `Puzzle:${newUnsolved.id}`,
                    });
                    const newUnsolvedRef = client.cache.writeFragment({
                      fragment: PUZZLE_AGGREGATE_FRAGMENT,
                      fragmentName: 'PuzzleAggregate',
                      id: `Puzzle:${newUnsolved.id}`,
                      data: {
                        ...newUnsolvedData,
                        ...newUnsolved,
                        starCount: 0,
                        starSum: 0,
                        bookmarkCount: 0,
                        commentCount: 0,
                        dialogueCount: 0,
                        ...newUnsolvedExtra,
                      },
                    });
                    if (
                      prev.some(ref => readField('id', ref) === newUnsolved.id)
                    ) {
                      return prev;
                    }
                    return [newUnsolvedRef, ...prev];
                  }
                },
              },
            });
            // 2. Update unsolved list with removed puzzle
            const puzzles = prev.puzzles.filter(
              puzzle => puzzle.id !== newUnsolved.id,
            );
            return {
              ...prev,
              puzzles,
            };
          } else if (maxModified < newModified) {
            // New puzzle added
            // Fetch new data from remote
            client
              .query<PuzzlesUnsolvedQuery, PuzzlesUnsolvedQueryVariables>({
                query: PUZZLES_UNSOLVED_QUERY,
                variables: {
                  since:
                    maxModified < 0
                      ? undefined
                      : new Date(maxModified).toISOString(),
                },
                fetchPolicy: 'network-only',
              })
              .then(({ data }) => {
                if (data.puzzles.length > 0) {
                  const puzzleUnsolvedQueryResult = client.readQuery<
                    PuzzlesUnsolvedQuery,
                    PuzzlesUnsolvedQueryVariables
                  >({
                    query: PUZZLES_UNSOLVED_QUERY,
                  });

                  // Notify user that a new puzzle's added
                  if (puzzleUnsolvedQueryResult !== null) {
                    // New puzzles are puzzles with no exact ids in previous query
                    const newPuzzles = data.puzzles.filter(
                      puzzle =>
                        puzzleUnsolvedQueryResult.puzzles.findIndex(
                          p => p.id === puzzle.id,
                        ) === -1,
                    );

                    newPuzzles.forEach(puzzle => {
                      let genreMessage = '';
                      switch (puzzle.genre) {
                        case Genre.CLASSIC:
                          genreMessage = _(puzzleMessages.genre_classic);
                          break;
                        case Genre.TWENTY_QUESTIONS:
                          genreMessage = _(
                            puzzleMessages.genre_twentyQuestions,
                          );
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

                    // Append new puzzles updated after max modified puzzles in unsolved list
                    client.writeQuery<PuzzlesUnsolvedQuery>({
                      query: PUZZLES_UNSOLVED_QUERY,
                      data: {
                        puzzles: upsertMultipleItem(
                          puzzleUnsolvedQueryResult.puzzles,
                          data.puzzles,
                          'id',
                          'desc',
                        ).filter(puzzle => puzzle.status === Status.UNDERGOING),
                      },
                    });
                  }
                }
              });
          }

          return prev;
        },
      }),
    [],
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient: ApolloClient<object> = initializeApollo();
  const serverSideContext = {
    route: ctx.resolvedUrl,
    cookie: ctx.req.headers.cookie || null,
  };

  await Promise.all([
    apolloClient.query<PuzzlesSolvedQuery, PuzzlesSolvedQueryVariables>({
      query: PUZZLES_SOLVED_QUERY,
      variables: { limit: PUZZLES_PER_PAGE },
    }),
    apolloClient.query<PuzzlesUnsolvedQuery>({ query: PUZZLES_UNSOLVED_QUERY }),
  ]);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      serverSideContext,
    },
  };
};

export default Puzzles;
