import React from 'react';
import Head from 'next/head';

import { Heading } from 'components/General';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import PuzzleAddForm from 'components/PuzzleAddForm';

import { FormattedMessage, intlShape } from 'react-intl';
import messages from 'messages/pages/add_puzzle';

class AddPuzzle extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const _ = this.context.intl.formatMessage;

    return (
      <React.Fragment>
        <Head>
          <title>{_(messages.title)} | Cindy</title>
          <meta name="description" content={_(messages.description)} />
        </Head>
        <Heading>
          <FormattedMessage {...messages.header} />
        </Heading>
        <PuzzleSubbar />
        <PuzzleAddForm />
      </React.Fragment>
    );
  }
}

export default AddPuzzle;
