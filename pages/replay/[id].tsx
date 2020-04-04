import React from 'react';
import Head from 'next/head';

import { injectIntl, IntlShape } from 'react-intl';
import messages from 'messages/pages/replay';

import ErrorPage from 'next/error';
import { Query } from '@apollo/react-components';
import { REPLAY_QUERY } from 'graphql/Queries/Replay';
import {
  ReplayQuery,
  ReplayQueryVariables,
} from 'graphql/Queries/generated/ReplayQuery';
import ReplayRenderer from 'components/Replay/Detail/ReplayRenderer';

class Replay extends React.Component<{ replayId: string; intl: IntlShape }> {
  static async getInitialProps({ query }: { query: { id: string } }) {
    return { replayId: query && query.id };
  }

  render() {
    const _ = this.props.intl.formatMessage;

    const replayId = parseInt(this.props.replayId, 10);

    if (Number.isNaN(replayId)) {
      return <ErrorPage statusCode={404} />;
    }

    return (
      <React.Fragment>
        <Head>
          <title>{_(messages.title)} | Cindy</title>
          <meta name="description" content={_(messages.description)} />
        </Head>
        <Query<ReplayQuery, ReplayQueryVariables>
          query={REPLAY_QUERY}
          variables={{ id: replayId }}
        >
          {props => <ReplayRenderer formatMessage={_} {...props} />}
        </Query>
      </React.Fragment>
    );
  }
}

export default injectIntl(Replay);
