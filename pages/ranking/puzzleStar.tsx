import React from 'react';
import Head from 'next/head';

import { Query } from 'react-apollo';
import { PUZZLE_STAR_RANKING_QUERY } from 'graphql/Queries/Ranking';

import { FormattedMessage, intlShape, FormattedDate } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import PuzzleStarRankingRenderer from 'components/Ranking/PuzzleStarRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getMonthlyDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';
import { RankingProps, RankingContext } from './types';

const PuzzleStarRanking = (_props: RankingProps, context: RankingContext) => {
  const _ = context.intl.formatMessage as any;
  const now = new Date();
  const [monthlyStart, monthlyEnd] = getMonthlyDate(now);
  return (
    <div>
      <Head>
        <title>
          {_(rankingMessages.title)} - {_(rankingMessages.puzzleStarRanking)} |
          Cindy
        </title>
        <meta name="description" content={_(rankingMessages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...rankingMessages.header} />
      </Heading>
      <Heading fontSize={4} pt={0}>
        <FormattedMessage {...rankingMessages.puzzleStarRanking} />
      </Heading>
      <Back />
      <Flex width={1} flexWrap="wrap">
        <Flex width={1} {...rankingPanelProps}>
          <Box width={1} {...rankingPanelTitleProps}>
            <FormattedMessage
              {...rankingMessages.puzzleStarRankingWithMonth}
              values={{
                date: (
                  <FormattedDate
                    value={monthlyStart as string}
                    year="numeric"
                    month="long"
                  />
                ),
              }}
            />
          </Box>
          <Query<PuzzleStarRankingQuery, PuzzleStarRankingQueryVariables>
            query={PUZZLE_STAR_RANKING_QUERY}
            variables={{
              createdGte: monthlyStart,
              createdLt: monthlyEnd,
              limit: 10,
            }}
          >
            {params => <PuzzleStarRankingRenderer {...params} shouldLoadMore />}
          </Query>
        </Flex>
      </Flex>
    </div>
  );
};

PuzzleStarRanking.contextTypes = {
  intl: intlShape,
};

export default PuzzleStarRanking;
