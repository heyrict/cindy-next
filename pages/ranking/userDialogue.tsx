import React from 'react';
import Head from 'next/head';

import { Query } from 'react-apollo';
import { USER_DIALOGUE_RANKING_QUERY } from 'graphql/Queries/Ranking';

import { FormattedMessage, intlShape, FormattedDate } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import UserDialogueRankingRenderer from 'components/Ranking/UserDialogueRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getMonthlyDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

import {
  UserDialogueRankingQuery,
  UserDialogueRankingQueryVariables,
} from 'graphql/Queries/generated/UserDialogueRankingQuery';
import { RankingProps, RankingContext } from './types';

const UserDialogueRanking = (_props: RankingProps, context: RankingContext) => {
  const _ = context.intl.formatMessage as any;
  const now = new Date();
  const [monthlyStart, monthlyEnd] = getMonthlyDate(now);
  return (
    <div>
      <Head>
        <title>
          {_(rankingMessages.title)} - {_(rankingMessages.userDialogueRanking)}{' '}
          | Cindy
        </title>
        <meta
          name="description"
          content={_(rankingMessages.userDialogueRanking)}
        />
      </Head>
      <Heading>
        <FormattedMessage {...rankingMessages.header} />
      </Heading>
      <Heading fontSize={4} pt={0}>
        <FormattedMessage {...rankingMessages.userDialogueRanking} />
      </Heading>
      <Back />
      <Flex width={1} flexWrap="wrap">
        <Flex width={1} {...rankingPanelProps}>
          <Box width={1} {...rankingPanelTitleProps}>
            <FormattedMessage
              {...rankingMessages.userDialogueRankingWithMonth}
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
          <Query<UserDialogueRankingQuery, UserDialogueRankingQueryVariables>
            query={USER_DIALOGUE_RANKING_QUERY}
            variables={{
              createdGte: monthlyStart,
              createdLt: monthlyEnd,
              limit: 10,
            }}
          >
            {params => (
              <UserDialogueRankingRenderer {...params} shouldLoadMore />
            )}
          </Query>
        </Flex>
      </Flex>
    </div>
  );
};

UserDialogueRanking.contextTypes = {
  intl: intlShape,
};

export default UserDialogueRanking;
