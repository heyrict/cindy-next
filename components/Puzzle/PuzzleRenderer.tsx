import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { maybeSendNotification } from 'common/web-notify';

import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import PuzzleDetail from 'components/Puzzle/Detail';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { useQuery } from '@apollo/client';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';
import { PUZZLE_SUB } from 'graphql/Subscriptions/Puzzles';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';
import userMessages from 'messages/components/user';
import webNotifyMessages from 'messages/webNotify';

import { PuzzleRendererProps } from './types';
import { text2raw } from 'common/markdown';
import {
  PuzzleSubVariables,
  PuzzleSub,
} from 'graphql/Subscriptions/generated/PuzzleSub';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';
import { Status } from 'generated/globalTypes';

const PuzzleRenderer = ({
  puzzleId,
  formatMessage,
  pushNotification,
}: PuzzleRendererProps) => {
  const { loading, error, data, refetch, subscribeToMore } = useQuery<
    PuzzleQuery,
    PuzzleQueryVariables
  >(PUZZLE_QUERY, {
    variables: {
      id: puzzleId,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ puzzle }) => {
      hasNotifiedSolvedRef.current = puzzle.status !== Status.UNDERGOING;
    },
  });

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

  useEffect(() =>
    subscribeToMore<PuzzleSub, PuzzleSubVariables>({
      document: PUZZLE_SUB,
      variables: { id: puzzleId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!prev || !prev.puzzle) return prev;
        const newPuzzle = subscriptionData.data.puzzleSub;
        const oldPuzzle = prev.puzzle;
        if (!newPuzzle) return prev;
        if (
          pushNotification &&
          document.hidden &&
          oldPuzzle.status !== Status.SOLVED &&
          newPuzzle.data.status === Status.SOLVED &&
          !hasNotifiedSolvedRef.current
        ) {
          hasNotifiedSolvedRef.current = true;
          maybeSendNotification(
            _(webNotifyMessages.puzzleSolved, {
              puzzle: oldPuzzle.title,
            }),
          );
        }
        return { puzzle: { ...oldPuzzle, ...newPuzzle.data } };
      },
    }),
  );

  if (error) {
    if (error.networkError === null) {
      console.log(error);
      return puzzleNotExistElement;
    } else {
      return <ErrorReload error={error} refetch={refetch} />;
    }
  }

  if (!data || !data.puzzle) {
    if (loading) return <Loading centered />;
    return puzzleNotExistElement;
  }
  const puzzle = data.puzzle;
  const shouldHideIdentity =
    puzzle.anonymous && puzzle.status === Status.UNDERGOING;
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
