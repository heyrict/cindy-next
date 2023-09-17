import React, { forwardRef, useState } from 'react';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage, useIntl } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import { Heading, Flex, Box, Button } from 'components/General';
import PuzzleStarRankingRenderer from 'components/Ranking/PuzzleStarRankingRenderer';
import Back from 'components/Ranking/Back';
import {
  getRankingDate,
  rankingPanelProps,
  rankingPanelTitleProps,
} from 'components/Ranking/constants';
import DatePicker from 'react-datepicker';

import { getFnsLocale, MIN_RANKING_DATE } from 'settings';

const PuzzleStarRanking = () => {
  const { year, month } = getRankingDate();
  const [date, setDate] = useState(() => {
    return new Date(year, month);
  });
  let selectedYear = date.getFullYear();
  let selectedMonth = date.getMonth();
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  const { formatMessage: _ } = useIntl();

  const CustomDateInput = forwardRef<any, any>(({ onClick }, ref) => (
    <Button
      fontSize={2}
      backgroundColor="preset.rankingpaneltitle.bg"
      color="preset.rankingpaneltitle.fg"
      borderBottom="1px solid"
      onClick={onClick}
      ref={ref}
    >
      {date.toLocaleDateString((language as string) || undefined, {
        month: 'long',
        year: 'numeric',
      })}
    </Button>
  ));

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
                  <DatePicker
                    selected={date}
                    onChange={date => setDate(date || new Date(year, month))}
                    minDate={MIN_RANKING_DATE}
                    maxDate={new Date(year, month)}
                    locale={getFnsLocale(language || 'en')()}
                    customInput={<CustomDateInput />}
                    showMonthYearPicker
                  />
                ),
              }}
            />
          </Box>
          <PuzzleStarRankingRenderer
            year={selectedYear}
            month={selectedMonth + 1}
            shouldLoadMore
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default PuzzleStarRanking;
