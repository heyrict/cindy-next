import React from 'react';
import Head from 'next/head';

import {
  FormattedMessage,
  FormattedDate,
  useIntl,
} from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import UserPuzzleRankingRenderer from 'components/Ranking/UserPuzzleRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getRankingDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

const UserPuzzleRanking = () => {
  const { formatMessage: _ } = useIntl();
  const { year, month } = getRankingDate();
  const date = new Date(year, month);

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
                  <FormattedDate value={date} year="numeric" month="long" />
                ),
              }}
            />
          </Box>
          <UserPuzzleRankingRenderer shouldLoadMore />
        </Flex>
      </Flex>
    </div>
  );
};

export default UserPuzzleRanking;
