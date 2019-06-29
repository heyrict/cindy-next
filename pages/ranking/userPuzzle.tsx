import React from 'react';
import Head from 'next/head';

import { Query } from 'react-apollo';
import { USER_PUZZLE_RANKING_QUERY } from 'graphql/Queries/Ranking';

import { FormattedMessage, intlShape, FormattedDate } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import UserPuzzleRankingRenderer from 'components/Ranking/UserPuzzleRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getMonthlyDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

import {
  UserPuzzleRankingQuery,
  UserPuzzleRankingQueryVariables,
} from 'graphql/Queries/generated/UserPuzzleRankingQuery';
import { RankingProps, RankingContext } from './types';

const UserPuzzleRanking = (_props: RankingProps, context: RankingContext) => {
  const _ = context.intl.formatMessage as any;
  const now = new Date();
  const [monthlyStart, monthlyEnd] = getMonthlyDate(now);
  return (
    <div>
      <Head>
        <title>
          {_(rankingMessages.title)} - {_(rankingMessages.userPuzzleRanking)} |
          Cindy
        </title>
        <meta
          name="description"
          content={_(rankingMessages.userPuzzleRanking)}
        />
      </Head>
      <Heading>
        <FormattedMessage {...rankingMessages.header} />
      </Heading>
      <Heading fontSize={4} pt={0}>
        <FormattedMessage {...rankingMessages.userPuzzleRanking} />
      </Heading>
      <Back />
      <Flex width={1} flexWrap="wrap">
        <Flex width={1} {...rankingPanelProps}>
          <Box width={1} {...rankingPanelTitleProps}>
            <FormattedMessage
              {...rankingMessages.userPuzzleRankingWithMonth}
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
          <Query<UserPuzzleRankingQuery, UserPuzzleRankingQueryVariables>
            query={USER_PUZZLE_RANKING_QUERY}
            variables={{
              createdGte: monthlyStart,
              createdLt: monthlyEnd,
              limit: 10,
            }}
          >
            {params => <UserPuzzleRankingRenderer {...params} shouldLoadMore />}
          </Query>
        </Flex>
      </Flex>
    </div>
  );
};

UserPuzzleRanking.contextTypes = {
  intl: intlShape,
};

export default UserPuzzleRanking;
