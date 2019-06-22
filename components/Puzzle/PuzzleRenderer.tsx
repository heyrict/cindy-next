import React, { useEffect } from 'react';
import Head from 'next/head';

import PuzzleDetail from 'components/Puzzle/Detail';

import { PUZZLE_LIVEQUERY } from 'graphql/LiveQueries/Puzzles';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';
import userMessages from 'messages/components/user';

import { PuzzleRendererProps } from './types';

const REMOVE_HTML_REGEXP = new RegExp('<[^<>\n]+>', 'g');

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
      });
  }, [puzzleId]);

  if (error) return <span>`Error: ${error.message}`</span>;
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
            content={`${_(messages.solveit)}: "${puzzle.content.replace(
              REMOVE_HTML_REGEXP,
              '',
            )}"`}
          />
        </Head>
        <PuzzleDetail puzzle={puzzle} />
      </React.Fragment>
    );
  }
  return puzzleNotExistElement;
};

export default PuzzleRenderer;
