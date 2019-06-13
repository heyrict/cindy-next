import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Heading, Flex, Box, Panel } from 'components/General';

import messages from 'messages/pages/replay';

class Replay extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };
  static propTypes = {
    replayId: PropTypes.string,
  };

  static async getInitialProps({ query }) {
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
