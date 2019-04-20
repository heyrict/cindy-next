import React from 'react';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Heading } from 'components/General';
import { UserBriefFragment } from 'components/User/Fragments';
import PuzzleBrief from 'components/Puzzle/Brief';

import messages from 'messages/pages/puzzle';

const PuzzleQuery = gql`
  query PuzzleQuery {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _eq: 0 } }
    ) {
      id
      genre
      title
      status
      yami
      anonymous
      created
      dazed_on
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${UserBriefFragment}
`;

const Puzzle = (props, context) => {
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
      <Query query={PuzzleQuery}>
        {({ loading, error, data }) => {
          return (
            <div>
              {loading && 'Loading...'}
              {error && `Error: ${error.message}`}
              {data &&
                data.sui_hei_puzzle &&
                data.sui_hei_puzzle.map(puzzle => (
                  <PuzzleBrief
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

Puzzle.contextTypes = {
  intl: intlShape,
};

export default Puzzle;
