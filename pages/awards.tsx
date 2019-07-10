import React from 'react';
import Head from 'next/head';

import { Heading } from 'components/General';
import AwardsRenderer from 'components/Award/AwardsRenderer';
import PuzzleSubbar from 'components/Subbar/Puzzle';

import { intlShape, IntlShape, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/awards';
import awardsMessages from 'messages/pages/awards';

const Awards = (_props: {}, context: { intl: IntlShape }) => {
  const _ = context.intl.formatMessage as any;

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...awardsMessages.header} />
      </Heading>
      <PuzzleSubbar />
      <AwardsRenderer />
    </React.Fragment>
  );
};

Awards.contextTypes = {
  intl: intlShape,
};

export default Awards;
