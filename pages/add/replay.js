import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Heading, Flex, Box, Panel } from 'components/General';

import KeywordWorkbench from 'components/Workbench/Keyword';

class AddReplay extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const _ = this.context.intl.formatMessage;

    return (
      <React.Fragment>
        <Head>
          <title>Add Replay | Cindy</title>
          <meta name="description" content={'Add replay'} />
        </Head>
        <KeywordWorkbench id={24} />
      </React.Fragment>
    );
  }
}

export default AddReplay;
