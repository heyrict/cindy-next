import React from 'react';
import Head from 'next/head';

import { Heading } from 'components/General';
import AwardsRenderer from 'components/Award/AwardsRenderer';
import PuzzleSubbar from 'components/Subbar/Puzzle';

import { useIntl, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/awards';
import awardsMessages from 'messages/pages/awards';
import { GetStaticProps } from 'next';

const Awards = () => {
  const { formatMessage: _ } = useIntl();

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

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    serverSideContext: {
      route: '/awards',
    },
  },
});

export default Awards;
