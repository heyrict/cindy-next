import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import PuzzleDetail from 'components/Puzzle/Detail';

import { Query } from 'react-apollo';
import { PUZZLE_LIVE_QUERY } from 'graphql/LiveQueries/Puzzles';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';

import { intlShape } from 'react-intl';
import messages from 'messages/pages/puzzle';
import userMessages from 'messages/components/user';

const REMOVE_HTML_REGEXP = new RegExp('<[^<>\n]+>', 'g');

const PuzzleRenderer = ({
  loading,
  error,
  data,
  subscribeToMore,
  formatMessage,
  puzzleId,
}) => {
  const _ = formatMessage;

  useEffect(
    () =>
      subscribeToMore({
        document: PUZZLE_LIVE_QUERY,
        variables: { id: puzzleId },
      }),
    [puzzleId],
  );

  if (error) return `Error: ${error.message}`;
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
  return null;
};

class Puzzle extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };
  static propTypes = {
    puzzleId: PropTypes.string,
  };

  static async getInitialProps({ query }) {
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
        <Query
          query={PUZZLE_QUERY}
          variables={{
            id: puzzleId,
          }}
        >
          {({ ...args }) => (
            <PuzzleRenderer {...args} formatMessage={_} puzzleId={puzzleId} />
          )}
        </Query>
      </React.Fragment>
    );
  }
}

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
