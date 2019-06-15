import React, { useEffect } from 'react';
import Head from 'next/head';
import PuzzleDetail from 'components/Puzzle/Detail';

import { Query } from 'react-apollo';
import { PUZZLE_LIVEQUERY } from 'graphql/LiveQueries/Puzzles';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';

import { intlShape, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';
import userMessages from 'messages/components/user';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';

import { PuzzleRendererProps, PuzzleProps } from './types';

const REMOVE_HTML_REGEXP = new RegExp('<[^<>\n]+>', 'g');

const PuzzleRenderer: any = ({
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

  if (error) return `Error: ${error.message}`;
  if (loading) return 'Loading...';
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

class Puzzle extends React.Component<PuzzleProps> {
  static contextTypes = {
    intl: intlShape,
  };

  static async getInitialProps({ query }: { query: { id: string } }) {
    return { puzzleId: query && query.id };
  }

  render() {
    const _ = this.context.intl.formatMessage;
    const { puzzleId } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{_(messages.title)}</title>
          <meta name="description" content={_(messages.description)} />
        </Head>
        <Query<PuzzleQuery, PuzzleQueryVariables>
          query={PUZZLE_QUERY}
          variables={{
            id: puzzleId,
          }}
        >
          {params => (
            <PuzzleRenderer {...params} formatMessage={_} puzzleId={puzzleId} />
          )}
        </Query>
        <div style={{ height: '400px' }} />
      </React.Fragment>
    );
  }
}

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
