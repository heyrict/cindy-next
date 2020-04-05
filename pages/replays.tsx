import React from 'react';
import Head from 'next/head';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import replaysPageMessages from 'messages/pages/replays';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { REPLAY_LIST_QUERY } from 'graphql/Queries/Replay';

import { Heading, Flex } from 'components/General';
import MultiColBox from 'components/General/MultiColBox';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import ReplayBrief from 'components/Replay/Brief';

import {
  ReplayListQuery,
  ReplayListQueryVariables,
} from 'graphql/Queries/generated/ReplayListQuery';

const Replays = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;

  return (
    <React.Fragment>
      <Head>
        <title>{_(replaysPageMessages.title)} | Cindy</title>
        <meta name="description" content={_(replaysPageMessages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...replaysPageMessages.header} />
      </Heading>
      <PuzzleSubbar />
      <Flex flexWrap="wrap">
        <PaginatedQuery<ReplayListQuery, ReplayListQueryVariables>
          query={REPLAY_LIST_QUERY}
          getItemCount={data =>
            (data.sui_hei_replay_aggregate &&
              data.sui_hei_replay_aggregate.aggregate &&
              data.sui_hei_replay_aggregate.aggregate.count) ||
            0
          }
          renderItems={data => {
            const replays = data.sui_hei_replay;
            if (!replays) return null;
            return (
              <>
                {replays.map(replay => (
                  <MultiColBox key={replay.id}>
                    <ReplayBrief replay={replay} />
                  </MultiColBox>
                ))}
              </>
            );
          }}
        />
      </Flex>
    </React.Fragment>
  );
};

export default injectIntl(Replays);
