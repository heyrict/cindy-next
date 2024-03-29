import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { asSearch } from 'common/search';
import { concatList } from 'common/update';

import { FormattedMessage, useIntl } from 'react-intl';
import tagsPageMessages from 'messages/pages/tags';
import commonMessages from 'messages/common';

import { useQuery } from '@apollo/client';
import { TAGS_PAGE_QUERY } from 'graphql/Queries/Tag';

import {
  Heading,
  Flex,
  Box,
  Panel,
  ButtonTransparent,
} from 'components/General';
import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';
import SortVarSetPanel from 'components/Search/SortVarSetPanel';
import { PuzzleTagBubbleBox } from 'components/Puzzle/Detail/PuzzleTags/shared';

import { Ordering } from 'generated/globalTypes';
import { FilterFieldTypeEnum } from 'components/Search/types';
import { TagsVariablesStates } from 'pageTypes';
import {
  TagsPageQueryVariables,
  TagsPageQuery,
} from 'graphql/Queries/generated/TagsPageQuery';
import { GetStaticProps } from 'next';

const TAGS_PER_PAGE = 50;

const ButtonTransparentA = ButtonTransparent.withComponent('a');

function TagsPageContents({ variables }: { variables: TagsVariablesStates }) {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(true);
  }, [variables]);

  const { data, loading, error, refetch, fetchMore } = useQuery<
    TagsPageQuery,
    TagsPageQueryVariables
  >(TAGS_PAGE_QUERY, {
    variables: {
      ...variables,
      limit: TAGS_PER_PAGE,
      offset: 0,
    },
    fetchPolicy: 'cache-first',
    onCompleted: data => {
      if (data.tags.length < TAGS_PER_PAGE) setHasMore(false);
    },
  });

  if (error) {
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (loading) return <Loading centered />;
  if (!data || !data.tags) return null;

  const fetchNextPage = () =>
    fetchMore({
      query: TAGS_PAGE_QUERY,
      variables: {
        ...variables,
        limit: TAGS_PER_PAGE,
        offset: data.tags.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          tags: concatList(prev.tags, fetchMoreResult.tags),
        };
      },
    }).then(({ data }) => {
      if (!data || data.tags.length < TAGS_PER_PAGE) setHasMore(false);
    });

  const { tags } = data;
  return (
    <Flex flexWrap="wrap" alignItems="center">
      {tags.map(tag => (
        <PuzzleTagBubbleBox key={tag.id}>
          <Box fontSize="1.2em">
            <Link href="/tag/[id]" as={`/tag/${tag.id}`} passHref>
              <ButtonTransparentA p={1} borderRadius={2}>
                {tag.name}
                <Box
                  display="inline-box"
                  fontSize="0.8em"
                  color="green.7"
                  pl={1}
                >
                  {tag.puzzleTagCount}
                </Box>
              </ButtonTransparentA>
            </Link>
          </Box>
        </PuzzleTagBubbleBox>
      ))}
      {tags.length >= TAGS_PER_PAGE && hasMore && (
        <PuzzleTagBubbleBox>
          <Box fontSize="1.2em">
            <ButtonTransparent
              onClick={fetchNextPage}
              px={3}
              py={1}
              borderRadius={2}
            >
              <FormattedMessage {...commonMessages.loadMore} />
            </ButtonTransparent>
          </Box>
        </PuzzleTagBubbleBox>
      )}
    </Flex>
  );
}

const Tags = () => {
  const intl = useIntl();
  const _ = intl.formatMessage;
  const searchRef = useRef<SearchVarSetPanel>(null!);
  const sortRef = useRef<SortVarSetPanel>(null!);

  const [variables, setVariables] = useState({
    name: null,
    orderBy: [{ puzzleTagCount: Ordering.DESC_NULLS_LAST }],
  } as TagsVariablesStates);

  return (
    <React.Fragment>
      <Head>
        <title>{_(tagsPageMessages.title)} | Cindy</title>
        <meta name="description" content={_(tagsPageMessages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...tagsPageMessages.header} />
      </Heading>
      <PuzzleSubbar />
      <Panel style={{ minHeight: 'auto' }} flexWrap="wrap">
        <SearchVarSetPanel
          ref={searchRef}
          filters={[
            {
              type: FilterFieldTypeEnum.TEXT,
              key: 'name',
              fieldName: <FormattedMessage {...tagsPageMessages.tagName} />,
            },
          ]}
        />
        <SortVarSetPanel
          ref={sortRef}
          initialField="puzzleTagCount"
          defaultValue={[{ puzzleTagCount: Ordering.DESC_NULLS_LAST }]}
          fields={[
            {
              key: 'id',
              fieldName: <FormattedMessage {...tagsPageMessages.tagCreated} />,
            },
            {
              key: 'name',
              fieldName: <FormattedMessage {...tagsPageMessages.tagName} />,
            },
            {
              key: 'puzzleTagCount',
              fieldName: (
                <FormattedMessage {...tagsPageMessages.tagPuzzleCount} />
              ),
            },
          ]}
        />
        <Flex width={1}>
          <Box
            width={1 / 2}
            p={1}
            mx={1}
            bg="preset.button.bg"
            borderRadius={2}
          >
            <ButtonTransparent
              width={1}
              color="preset.button.fg"
              onClick={() => {
                const newVariables = { ...variables };

                searchRef.current.reset();
                sortRef.current.reset();
                newVariables.name = null;
                newVariables.orderBy = [
                  { puzzleTagCount: Ordering.DESC_NULLS_LAST },
                ];

                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.reset} />
            </ButtonTransparent>
          </Box>
          <Box
            width={1 / 2}
            p={1}
            mx={1}
            bg="preset.button.bg"
            borderRadius={2}
          >
            <ButtonTransparent
              width={1}
              color="preset.button.fg"
              onClick={() => {
                const newVariables = { ...variables };

                const searchData = searchRef.current.getData();
                newVariables.name = asSearch(searchData.name);
                newVariables.orderBy = [];
                const sortData = sortRef.current.getData();
                newVariables.orderBy = sortData;

                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.search} />
            </ButtonTransparent>
          </Box>
        </Flex>
      </Panel>
      <TagsPageContents variables={variables} />
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    serverSideContext: {
      route: '/tags',
    },
  },
});

export default Tags;
