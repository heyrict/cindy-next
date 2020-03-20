import React from 'react';
import Head from 'next/head';
import { googleAdInfo } from 'settings';

import { Query } from '@apollo/react-components';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';

import { injectIntl } from 'react-intl';
import messages from 'messages/pages/puzzle';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';

import PuzzleRenderer from 'components/Puzzle/PuzzleRenderer';
import GoogleAd from 'components/GoogleAd';

import { PuzzleProps } from 'pageTypes';

class Puzzle extends React.Component<PuzzleProps> {
  static async getInitialProps({ query }: { query: { id: string } }) {
    return { puzzleId: query && query.id };
  }

  render() {
    const _ = this.props.intl.formatMessage;
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
          {params => <PuzzleRenderer {...params} formatMessage={_} />}
        </Query>
        <GoogleAd {...googleAdInfo.inarticleAd} />
      </React.Fragment>
    );
  }
}

export default injectIntl(Puzzle);
