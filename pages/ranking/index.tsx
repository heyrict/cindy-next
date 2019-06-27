import React from 'react';
import Head from 'next/head';

import { Query } from 'react-apollo';
import { PUZZLE_STAR_RANKING_QUERY } from 'graphql/Queries/Ranking';

import { FormattedMessage, intlShape } from 'react-intl';
import messages from 'messages/pages/ranking';

import { Heading, Flex } from 'components/General';
import PuzzleStarRankingRenderer from 'components/Ranking/PuzzleStarRankingRenderer';

import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';
import { RankingProps, RankingContext } from './types';

const getMonthlyDate = (now: Date) => {
  const temp = new Date(now);
  temp.setUTCDate(1);
  temp.setUTCHours(0);
  temp.setUTCMinutes(0);
  temp.setUTCSeconds(0);
  temp.setUTCMilliseconds(0);
  if (temp.getDate() > 15) {
    const end = temp.toISOString();
    temp.setMonth(temp.getMonth() - 1);
    const start = temp.toISOString();
    return [start, end];
  } else {
    temp.setMonth(temp.getMonth() - 1);
    const end = temp.toISOString();
    temp.setMonth(temp.getMonth() - 2);
    const start = temp.toISOString();
    return [start, end];
  }
};

const Ranking = (_props: RankingProps, context: RankingContext) => {
  const _ = context.intl.formatMessage as any;
  const now = new Date();
  const [monthlyStart, monthlyEnd] = getMonthlyDate(now);
  return (
    <div>
      <Head>
        <title>{_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Flex width={1} flexWrap="wrap">
        <Query<PuzzleStarRankingQuery, PuzzleStarRankingQueryVariables>
          query={PUZZLE_STAR_RANKING_QUERY}
          variables={{
            createdGte: monthlyStart,
            createdLt: monthlyEnd,
            limit: 5,
          }}
        >
          {params => <PuzzleStarRankingRenderer {...params} />}
        </Query>
      </Flex>
    </div>
  );
};

Ranking.contextTypes = {
  intl: intlShape,
};

export default Ranking;
