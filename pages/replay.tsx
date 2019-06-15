import React from 'react';
import Head from 'next/head';
import { intlShape } from 'react-intl';

import messages from 'messages/pages/replay';

class Replay extends React.Component<{ replayId: string }> {
  static contextTypes = {
    intl: intlShape,
  };

  static async getInitialProps({ query }: { query: { id: string } }) {
    return { replayId: query && query.id };
  }

  render() {
    const _ = this.context.intl.formatMessage;

    return (
      <React.Fragment>
        <Head>
          <title>
            {_(messages.title)}{' '}
            | Cindy
          </title>
          <meta
            name="description"
            content={_(messages.description)}
          />
        </Head>
        <div>{this.props.replayId}</div>
      </React.Fragment>
    );
  }
}

export default Replay;