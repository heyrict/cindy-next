import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import tagMessages from 'messages/pages/tag';

import { Query } from 'react-apollo';
import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { TAG_PUZZLES_QUERY } from 'graphql/Queries/Puzzles';
import { TAG_QUERY } from 'graphql/Queries/Tag';

import { Heading, Flex, Box } from 'components/General';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import PuzzleBrief from 'components/Puzzle/Brief';

import {
  TagPuzzlesQuery,
  TagPuzzlesQueryVariables,
} from 'graphql/Queries/generated/TagPuzzlesQuery';
import {
  TagQuery,
  TagQueryVariables,
} from 'graphql/Queries/generated/TagQuery';
import { order_by } from 'generated/globalTypes';

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];

const TagPage = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;
  const router = useRouter();
  const { id } = router.query;
  const tagId = parseInt(id as string, 10);

  return (
    <React.Fragment>
      <Head>
        <title key="title">{_(tagMessages.title)} | Cindy</title>
        <meta
          key="description"
          name="description"
          content={_(tagMessages.description)}
        />
      </Head>
      <PuzzleSubbar />
      <Query<TagQuery, TagQueryVariables>
        query={TAG_QUERY}
        variables={{
          tagId,
        }}
      >
        {({ data, error }) => {
          if (error) {
            toast.error(error.message);
            return (
              <Heading>
                <FormattedMessage {...tagMessages.header} />
              </Heading>
            );
          }
          if (!data || !data.sui_hei_tag_by_pk) {
            return (
              <Heading>
                <FormattedMessage {...tagMessages.header} />
              </Heading>
            );
          }
          return (
            <React.Fragment>
              <Head>
                <title key="title">
                  {_(tagMessages.titleWithName, {
                    name: data.sui_hei_tag_by_pk.name,
                  })}{' '}
                  | Cindy
                </title>
                <meta
                  key="description"
                  name="description"
                  content={_(tagMessages.descriptionWithName, {
                    name: data.sui_hei_tag_by_pk.name,
                  })}
                />
              </Head>
              <Heading>
                <FormattedMessage
                  {...tagMessages.headerWithName}
                  values={{ name: data.sui_hei_tag_by_pk.name }}
                />
              </Heading>
            </React.Fragment>
          );
        }}
      </Query>
      <Flex flexWrap="wrap">
        <PaginatedQuery<TagPuzzlesQuery, TagPuzzlesQueryVariables>
          query={TAG_PUZZLES_QUERY}
          variables={{
            tagId,
            orderBy: [{ id: order_by.desc }],
          }}
          fetchPolicy="cache-first"
          getItemCount={data =>
            (data.sui_hei_puzzle_aggregate &&
              data.sui_hei_puzzle_aggregate.aggregate &&
              data.sui_hei_puzzle_aggregate.aggregate.count) ||
            0
          }
          renderItems={data => {
            const puzzles = data.sui_hei_puzzle;
            if (!puzzles) return null;
            return puzzles.map(puzzle => (
              <Box key={puzzle.id} width={puzzleWidth}>
                <PuzzleBrief puzzle={puzzle} />
              </Box>
            ));
          }}
        />
      </Flex>
    </React.Fragment>
  );
};

export default injectIntl(TagPage);
