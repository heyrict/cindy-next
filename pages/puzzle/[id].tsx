import React from 'react';
import Head from 'next/head';
import { googleAdInfo } from 'settings';

import { injectIntl } from 'react-intl';
import messages from 'messages/pages/puzzle';

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
        <PuzzleRenderer puzzleId={puzzleId} formatMessage={_} />
        <GoogleAd {...googleAdInfo.inarticleAd} />
      </React.Fragment>
    );
  }
}

export default injectIntl(Puzzle);
