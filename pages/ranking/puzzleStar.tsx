import React, { forwardRef, useState } from 'react';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
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
import { ja } from 'date-fns/locale';

import { MIN_RANKING_DATE } from 'settings';

const PuzzleStarRanking = () => {
  const { formatMessage: _ } = useIntl();
  const { year, month } = getRankingDate();
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  const [date, setDate] = useState(new Date(year, month));

  const CustomDateInput = forwardRef<any, any>(({ value, onClick }, ref) => (
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
                    locale={(language as string) || undefined}
                    customInput={<CustomDateInput />}
                    showMonthYearPicker
                  />
                ),
              }}
            />
          </Box>
          <PuzzleStarRankingRenderer
            year={date.getFullYear()}
            month={date.getMonth()}
            shouldLoadMore
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default PuzzleStarRanking;
