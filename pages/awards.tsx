import React from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

import { Flex, Box, Heading } from 'components/General';

import { Query } from 'react-apollo';
import { ALL_AWARDS_QUERY } from 'graphql/Queries/Awards';

import { intlShape, IntlShape, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/awards';
import awardsMessages from 'messages/pages/awards';

import { AllAwardsQuery } from 'graphql/Queries/generated/AllAwardsQuery';
import {
  PuzzleCountAwards,
  QuestionCountAwards,
  GoodQuestionCountAwards,
  TrueAnswerCountAwards,
} from 'components/AwardChecker/constants';
import CurrentUserAward from 'components/User/CurrentUserAward';
import styled from '@emotion/styled';

const AwardTable = styled.table`
  text-align: center;
  width: 100%;
`;

const Awards = (_props: {}, context: { intl: IntlShape }) => {
  const _ = context.intl.formatMessage as any;

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...awardsMessages.heading} />
      </Heading>
      <Query<AllAwardsQuery> query={ALL_AWARDS_QUERY}>
        {({ loading, data, error }) => {
          if (loading) return <span>Loading...</span>;
          if (!data || !data.sui_hei_award) return null;
          if (error) {
            toast.error(error.message);
          }

          const AwardTableRenderer = ({
            awardsObj,
            header,
          }: {
            awardsObj: { [key: number]: number };
            header: React.ReactNode;
          }) => (
            <Box width={[1 / 2, 1 / 3, 1 / 2, 1 / 3, 1 / 4]} mb={2}>
              <Box textAlign="center" fontSize={2} color="orange.6" width={1}>
                {header}
              </Box>
              <AwardTable>
                <tbody>
                  {Object.entries(awardsObj).map(([count, awardId]) => {
                    const award = data.sui_hei_award.find(
                      a => a.id === awardId,
                    );
                    if (!award) return null;
                    return (
                      <tr key={award.id}>
                        <td>{count}</td>
                        <td>
                          <CurrentUserAward
                            useraward={{
                              id: -1,
                              sui_hei_award: award,
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </AwardTable>
            </Box>
          );

          return (
            <Flex flexWrap="wrap">
              <AwardTableRenderer
                header={
                  <FormattedMessage {...awardsMessages.group_puzzleCount} />
                }
                awardsObj={PuzzleCountAwards}
              />
              <AwardTableRenderer
                header={
                  <FormattedMessage {...awardsMessages.group_questionCount} />
                }
                awardsObj={QuestionCountAwards}
              />
              <AwardTableRenderer
                header={
                  <FormattedMessage
                    {...awardsMessages.group_goodQuestionCount}
                  />
                }
                awardsObj={GoodQuestionCountAwards}
              />
              <AwardTableRenderer
                header={
                  <FormattedMessage {...awardsMessages.group_trueAnswerCount} />
                }
                awardsObj={TrueAnswerCountAwards}
              />
            </Flex>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

Awards.contextTypes = {
  intl: intlShape,
};

export default Awards;
