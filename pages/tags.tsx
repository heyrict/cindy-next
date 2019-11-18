import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { asSearch } from 'common/search';
import { concatList } from 'common/update';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import tagsPageMessages from 'messages/pages/tags';
import commonMessages from 'messages/common';

import { Query } from '@apollo/react-components';
import { TAGS_PAGE_QUERY } from 'graphql/Queries/Tag';

import {
  Heading,
  Flex,
  Box,
  Panel,
  ButtonTransparent,
} from 'components/General';
import Loading from 'components/General/Loading';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';
import SortVarSetPanel from 'components/Search/SortVarSetPanel';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import { PuzzleTagBubbleBox } from 'components/Puzzle/Detail/PuzzleTags/shared';

import { order_by } from 'generated/globalTypes';
import { FilterFieldTypeEnum } from 'components/Search/types';
import { TagsVariablesStates } from 'pageTypes';
import {
  TagsPageQueryVariables,
  TagsPageQuery,
} from 'graphql/Queries/generated/TagsPageQuery';

const TAGS_PER_PAGE = 50;

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Tags = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;
  const searchRef = useRef<SearchVarSetPanel>(null!);
  const sortRef = useRef<SortVarSetPanel>(null!);
  const [variables, setVariables] = useState({
    name: null,
    orderBy: [{ id: order_by.desc_nulls_last }],
  } as TagsVariablesStates);
  const [hasMore, setHasMore] = useState(true);

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
      <Panel flexWrap="wrap">
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
          initialField="id"
          defaultValue={[{ id: order_by.desc_nulls_last }]}
          fields={[
            {
              key: 'id',
              fieldName: <FormattedMessage {...tagsPageMessages.tagCreated} />,
            },
            {
              key: 'puzzle_tag_count',
              getValue: order => ({
                sui_hei_puzzle_tags_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...tagsPageMessages.tagPuzzleCount} />
              ),
            },
          ]}
        />
        <Flex width={1}>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                const newVariables = { ...variables };

                searchRef.current.reset();
                sortRef.current.reset();
                newVariables.name = null;
                newVariables.orderBy = [{ id: order_by.desc_nulls_last }];

                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.reset} />
            </ButtonTransparent>
          </Box>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
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
      <Flex flexWrap="wrap">
        <Query<TagsPageQuery, TagsPageQueryVariables>
          query={TAGS_PAGE_QUERY}
          variables={{ ...variables, limit: TAGS_PER_PAGE, offset: 0 }}
          fetchPolicy="cache-first"
        >
          {({ data, loading, error, fetchMore }) => {
            if (error) {
              toast.error(error);
              return null;
            }
            if (loading) return <Loading centered />;
            if (!data || !data.sui_hei_tag) return null;

            const tags = data.sui_hei_tag;
            return (
              <Flex flexWrap="wrap" alignItems="center">
                {tags.map(tag => (
                  <PuzzleTagBubbleBox key={tag.id}>
                    <Box fontSize="1.2em">
                      <Link href="/tag/[id]" as={`/tag/${tag.id}`} passHref>
                        <ButtonTransparentA p={1} borderRadius={2}>
                          {tag.name}
                          {tag.sui_hei_puzzle_tags_aggregate.aggregate && (
                            <Box
                              display="inline-box"
                              fontSize="0.8em"
                              color="green.7"
                              pl={1}
                            >
                              {
                                tag.sui_hei_puzzle_tags_aggregate.aggregate
                                  .count
                              }
                            </Box>
                          )}
                        </ButtonTransparentA>
                      </Link>
                    </Box>
                  </PuzzleTagBubbleBox>
                ))}
                {tags.length >= TAGS_PER_PAGE && hasMore && (
                  <LoadMoreVis
                    loadMore={() =>
                      fetchMore({
                        query: TAGS_PAGE_QUERY,
                        variables: {
                          ...variables,
                          offset: data.sui_hei_tag.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          if (
                            fetchMoreResult.sui_hei_tag.length < TAGS_PER_PAGE
                          )
                            setHasMore(false);
                          return {
                            ...prev,
                            sui_hei_tag: concatList(
                              prev.sui_hei_tag,
                              fetchMoreResult.sui_hei_tag,
                            ),
                          };
                        },
                      })
                    }
                  />
                )}
              </Flex>
            );
          }}
        </Query>
      </Flex>
    </React.Fragment>
  );
};

export default injectIntl(Tags);
