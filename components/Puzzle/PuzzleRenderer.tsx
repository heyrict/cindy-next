import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { maybeSendNotification } from 'common/web-notify';

import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import PuzzleDetail from 'components/Puzzle/Detail';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { PUZZLE_LIVEQUERY } from 'graphql/LiveQueries/Puzzles';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';
import userMessages from 'messages/components/user';
import webNotifyMessages from 'messages/webNotify';

import { PuzzleRendererProps } from './types';
import { text2raw } from 'common/markdown';
import { PuzzleLiveQuery } from 'graphql/LiveQueries/generated/PuzzleLiveQuery';
import { SubscribeToMoreOptions } from 'apollo-client/core/watchQueryOptions';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';

const PuzzleRenderer = ({
  loading,
  error,
  data,
  refetch,
  subscribeToMore,
  formatMessage,
  pushNotification,
}: PuzzleRendererProps) => {
  const hasNotifiedSolvedRef = useRef<boolean>(false);
  const _ = formatMessage;
  const puzzleNotExistElement = (
    <React.Fragment>
      <Head>
        <title>{_(commonMessages.notExist)} | Cindy</title>
        <meta name="description" content={_(messages.notExistDescription)} />
      </Head>
      <h1 style={{ margin: '1em' }}>
        <FormattedMessage {...messages.notExistDescription} />
      </h1>
    </React.Fragment>
  );

  useEffect(() => {
    if (data && data.puzzle_by_pk) {
      const puzzleId = data.puzzle_by_pk.id;
      return subscribeToMore({
        document: PUZZLE_LIVEQUERY,
        variables: { id: puzzleId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!prev) return prev;
          const newPuzzle = subscriptionData.data.puzzle_by_pk;
          const oldPuzzle = prev.puzzle_by_pk;
          if (!oldPuzzle) return subscriptionData.data;
          if (!newPuzzle) return prev;
          if (
            pushNotification &&
            document.hidden &&
            newPuzzle.status === 1 &&
            !hasNotifiedSolvedRef.current
          ) {
            hasNotifiedSolvedRef.current = true;
            const not = maybeSendNotification(
              _(webNotifyMessages.puzzleSolved, {
                puzzle: oldPuzzle.title,
              }),
            );
            console.log(not);
          }
          return { puzzle_by_pk: { ...oldPuzzle, ...newPuzzle } };
        },
      } as SubscribeToMoreOptions<PuzzleQuery, PuzzleQueryVariables, PuzzleLiveQuery>);
    }
  }, [data && data.puzzle_by_pk && data.puzzle_by_pk.id]);

  if (error) {
    if (error.networkError === null) {
      console.log(error);
      return puzzleNotExistElement;
    } else {
      return <ErrorReload error={error} refetch={refetch} />;
    }
  }

  if (!data || !data.puzzle_by_pk) {
    if (loading) return <Loading centered />;
    return puzzleNotExistElement;
  }
  const puzzle = data.puzzle_by_pk;
  if (puzzle.id === undefined) return puzzleNotExistElement;
  const shouldHideIdentity = puzzle.anonymous && puzzle.status === 0;
  return (
    <React.Fragment>
      <Head>
        <title>
          {puzzle.title} by{' '}
          {shouldHideIdentity
            ? _(userMessages.anonymousUser)
            : puzzle.user.nickname}{' '}
          | Cindy
        </title>
        <meta
          name="description"
          content={`${_(messages.solveit)}: "${text2raw(puzzle.content)}"`}
        />
      </Head>
      <PuzzleDetail puzzle={puzzle} />
    </React.Fragment>
  );
};

const withRedux = connect(state => ({
  pushNotification: settingReducer.rootSelector(state).pushNotification,
}));

export default withRedux(PuzzleRenderer);
