import React from 'react';
import Head from 'next/head';
import { googleAdInfo } from 'settings';

import { useIntl } from 'react-intl';
import messages from 'messages/pages/puzzle';

import PuzzleRenderer from 'components/Puzzle/PuzzleRenderer';
import GoogleAd from 'components/GoogleAd';

import { useRouter } from 'next/router';

const PuzzlePage = () => {
  const { formatMessage: _ } = useIntl();
  const router = useRouter();
  const { id } = router.query;

  const puzzleId = parseInt(id as string, 10);

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      {isNaN(puzzleId) ? null : (
        <PuzzleRenderer puzzleId={puzzleId} formatMessage={_} />
      )}
      <GoogleAd {...googleAdInfo.inarticleAd} />
    </React.Fragment>
  );
};

export const getInitialProps = async () => ({});

export default PuzzlePage;
