import React from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Heading } from 'components/General';

import messages from 'messages/pages/puzzle';

const Puzzle = (props, context) => {
  const _ = context.intl.formatMessage;
  return (
    <div>
      <Head>
        <title>{_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
    </div>
  );
};

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
