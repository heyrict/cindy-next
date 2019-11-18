import React from 'react';
import Head from 'next/head';

import { injectIntl } from 'react-intl';
import messages from 'messages/pages/add_replay';

import KeywordWorkbench from 'components/Workbench/Keyword';

import { AddReplayProps } from 'pageTypes';

class AddReplay extends React.Component<AddReplayProps> {
  static async getInitialProps({ query }: { query: { id: string } }) {
    return { puzzleId: parseInt(query.id) };
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
        <KeywordWorkbench id={puzzleId} />
      </React.Fragment>
    );
  }
}

export default injectIntl(AddReplay);
