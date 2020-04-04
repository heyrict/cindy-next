import React from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
import ReplayDetail from 'components/Replay/Detail';

import { FormattedMessage } from 'react-intl';
import puzzlePageMessages from 'messages/pages/puzzle';
import replayPageMessages from 'messages/pages/replay';
import commonMessages from 'messages/common';

import { ReplayRendererProps } from './types';
import { text2raw } from 'common/markdown';

const ReplayRenderer = ({
  loading,
  error,
  data,
  formatMessage,
}: ReplayRendererProps) => {
  const _ = formatMessage;
  const replayNotExistElement = (
    <React.Fragment>
      <Head>
        <title>{_(commonMessages.notExist)} | Cindy</title>
        <meta
          name="description"
          content={_(replayPageMessages.notExistDescription)}
        />
      </Head>
      <h1 style={{ margin: '1em' }}>
        <FormattedMessage {...replayPageMessages.notExistDescription} />
      </h1>
    </React.Fragment>
  );

  if (error) {
    toast.error(error.message);
    return replayNotExistElement;
  }
  if (!data || !data.sui_hei_replay_by_pk) {
    if (loading) return <Loading centered />;
    return replayNotExistElement;
  }
  const replay = data.sui_hei_replay_by_pk;
  if (replay.id === undefined) return replayNotExistElement;
  return (
    <React.Fragment>
      <Head>
        <title>
          {replay.title} by {replay.sui_hei_user.nickname} | Cindy
        </title>
        <meta
          name="description"
          content={`${_(puzzlePageMessages.solveit)}: "${text2raw(
            replay.sui_hei_puzzle ? replay.sui_hei_puzzle.content : '',
          )}"`}
        />
      </Head>
      <ReplayDetail replay={replay} />
    </React.Fragment>
  );
};

export default ReplayRenderer;
