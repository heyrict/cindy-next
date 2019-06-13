import React from 'react';
import Head from 'next/head';
import { intlShape } from 'react-intl';

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
