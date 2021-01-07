import React from 'react';
import Head from 'next/head';

import { FormattedMessage, injectIntl, FormattedDate, useIntl } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box } from 'components/General';
import PuzzleStarRankingRenderer from 'components/Ranking/PuzzleStarRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getRankingDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';

const PuzzleStarRanking = () => {
  const { formatMessage: _ } = useIntl();
  const { year, month } = getRankingDate();
  const date = new Date(year, month);

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
                    value={date}
                    year="numeric"
                    month="long"
                  />
                ),
              }}
            />
          </Box>
          <PuzzleStarRankingRenderer shouldLoadMore />
        </Flex>
      </Flex>
    </div>
  );
};

export default injectIntl(PuzzleStarRanking);
