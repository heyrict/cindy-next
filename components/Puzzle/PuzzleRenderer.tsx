import React, { useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { maybeSendNotification } from 'common/web-notify';

import PuzzleDetail from 'components/Puzzle/Detail';

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

let hasNotifiedSolved = false;

const PuzzleRenderer = ({
  loading,
  error,
  data,
  subscribeToMore,
  formatMessage,
  puzzleId,
}: PuzzleRendererProps) => {
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
    if (puzzleId !== null)
      return subscribeToMore({
        document: PUZZLE_LIVEQUERY,
        variables: { id: puzzleId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!prev) return prev;
          const newPuzzle = subscriptionData.data.sui_hei_puzzle_by_pk;
          const oldPuzzle = prev.sui_hei_puzzle_by_pk;
          if (!oldPuzzle) return subscriptionData.data;
          if (!newPuzzle) return prev;
          if (document.hidden && newPuzzle.status === 1 && !hasNotifiedSolved) {
            hasNotifiedSolved = true;
            const not = maybeSendNotification(
              _(webNotifyMessages.puzzleSolved, {
                puzzle: oldPuzzle.title,
              }),
            );
            console.log(not);
          }
          return { sui_hei_puzzle_by_pk: { ...oldPuzzle, ...newPuzzle } };
        },
      } as SubscribeToMoreOptions<PuzzleQuery, PuzzleQueryVariables, PuzzleLiveQuery>);
  }, [puzzleId]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (loading && (!data || !data.sui_hei_puzzle_by_pk))
    return <span>'Loading...'</span>;
  if (data && data.sui_hei_puzzle_by_pk) {
    const puzzle = data.sui_hei_puzzle_by_pk;
    if (puzzle.id === undefined) return null;
    const shouldHideIdentity = puzzle.anonymous && puzzle.status === 0;
    return (
      <React.Fragment>
        <Head>
          <title>
            {puzzle.title} by{' '}
            {shouldHideIdentity
              ? _(userMessages.anonymousUser)
              : puzzle.sui_hei_user.nickname}{' '}
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
  }
  return puzzleNotExistElement;
};

export default PuzzleRenderer;
