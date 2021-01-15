import React from 'react';
import Head from 'next/head';

import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import UserDialogueRankingRenderer from 'components/Ranking/UserDialogueRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getRankingDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

const UserDialogueRanking = () => {
  const { formatMessage: _ } = useIntl();
  const { year, month } = getRankingDate();
  const date = new Date(year, month);

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
                  <FormattedDate value={date} year="numeric" month="long" />
                ),
              }}
            />
          </Box>
          <UserDialogueRankingRenderer shouldLoadMore />
        </Flex>
      </Flex>
    </div>
  );
};

export default UserDialogueRanking;
