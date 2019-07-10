import React from 'react';
import Head from 'next/head';

import { Query } from 'react-apollo';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';

import { intlShape } from 'react-intl';
import messages from 'messages/pages/puzzle';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';

import { PuzzleProps } from './types';

import PuzzleRenderer from 'components/Puzzle/PuzzleRenderer';

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
          <title>{_(messages.title)} | Cindy</title>
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
      </React.Fragment>
    );
  }
}

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
