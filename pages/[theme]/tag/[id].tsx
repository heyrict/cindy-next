import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';
import tagMessages from 'messages/pages/tag';

import { Query } from '@apollo/client/react/components';
import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { TAG_PUZZLES_QUERY } from 'graphql/Queries/Puzzles';
import { TAG_QUERY } from 'graphql/Queries/Tag';

import { Heading, Flex } from 'components/General';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import PuzzleBrief from 'components/Puzzle/Brief';
import MultiColBox from 'components/General/MultiColBox';

import {
  TagPuzzlesQuery,
  TagPuzzlesQueryVariables,
} from 'graphql/Queries/generated/TagPuzzlesQuery';
import {
  TagQuery,
  TagQueryVariables,
} from 'graphql/Queries/generated/TagQuery';
import { Ordering } from 'generated/globalTypes';

const TagPage = () => {
  const { formatMessage: _ } = useIntl();
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
          if (!data || !data.tag) {
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
                    name: data.tag.name,
                  })}{' '}
                  | Cindy
                </title>
                <meta
                  key="description"
                  name="description"
                  content={_(tagMessages.descriptionWithName, {
                    name: data.tag.name,
                  })}
                />
              </Head>
              <Heading>
                <FormattedMessage
                  {...tagMessages.headerWithName}
                  values={{ name: data.tag.name }}
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
            orderBy: [{ id: Ordering.DESC }],
          }}
          fetchPolicy="cache-first"
          getItemCount={data => data.puzzleTagCount}
          renderItems={data => {
            const puzzleTags = data.puzzleTags;
            if (!puzzleTags) return null;
            return (
              <>
                {puzzleTags.map(puzzleTag => (
                  <MultiColBox key={`tag-${puzzleTag.id}`}>
                    <PuzzleBrief puzzle={puzzleTag.puzzle} />
                  </MultiColBox>
                ))}
              </>
            );
          }}
        />
      </Flex>
    </React.Fragment>
  );
};

export default TagPage;
