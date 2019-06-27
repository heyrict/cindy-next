import React from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Query } from 'react-apollo';
import {
  USER_PUZZLE_RANKING_QUERY,
  USER_DIALOGUE_RANKING_QUERY,
  PUZZLE_STAR_RANKING_QUERY,
} from 'graphql/Queries/Ranking';
import { Heading } from 'components/General';

import messages from 'messages/pages/ranking';

import { PuzzleStarRankingQuery } from 'graphql/Queries/generated/PuzzleStarRankingQuery';

const Ranking = (props, context) => {
  const _ = context.intl.formatMessage;
  return (
    <div>
      <Head>
        <title>{_(messages.title)}</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Query<PuzzleStarRankingQuery> query={PUZZLE_STAR_RANKING_QUERY}>
        {({ loading, error, data }) => {
          return (
            <div>
              {loading && 'Loading...'}
              {error && `Error: ${error.message}`}
              {data &&
                data.sui_hei_puzzle &&
                data.sui_hei_puzzle.map(puzzle => (
                  <RankingBrief
                    key={`puzzle-brief-${puzzle.id}`}
                    puzzle={puzzle}
                  />
                ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

Ranking.contextTypes = {
  intl: intlShape,
};

export default Ranking;
