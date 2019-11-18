import React from 'react';
import Head from 'next/head';

import { Heading } from 'components/General';
import AwardsRenderer from 'components/Award/AwardsRenderer';
import PuzzleSubbar from 'components/Subbar/Puzzle';

import { injectIntl, IntlShape, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/awards';
import awardsMessages from 'messages/pages/awards';

const Awards = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;

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

export default injectIntl(Awards);
