import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { asSearch } from 'common/search';

import { FormattedMessage, useIntl } from 'react-intl';
import searchMessages from 'messages/pages/search';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { SOLVED_PUZZLES_SEARCH_QUERY } from 'graphql/Queries/Puzzles';

import {
  Heading,
  Flex,
  Box,
  Panel,
  ButtonTransparent,
} from 'components/General';
import MultiColBox from 'components/General/MultiColBox';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';
import SortVarSetPanel from 'components/Search/SortVarSetPanel';
import PuzzleBrief from 'components/Puzzle/Brief';

import { Genre, Ordering, Yami } from 'generated/globalTypes';
import {
  SolvedPuzzlesSearchQuery,
  SolvedPuzzlesSearchQueryVariables,
} from 'graphql/Queries/generated/SolvedPuzzlesSearchQuery';
import { FilterFieldTypeEnum } from 'components/Search/types';
import { SearchVariablesStates } from 'pageTypes';

const Search = () => {
  const { formatMessage: _ } = useIntl();
  const searchRef = useRef<SearchVarSetPanel>(null);
  const sortRef = useRef<SortVarSetPanel>(null);
  const [variables, setVariables] = useState({
    title: null,
    content: null,
    solution: null,
    genre: null,
    yami: null,
    orderBy: [{ id: Ordering.DESC_NULLS_LAST }],
  } as SearchVariablesStates);

  return (
    <React.Fragment>
      <Head>
        <title>{_(searchMessages.title)} | Cindy</title>
        <meta name="description" content={_(searchMessages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...searchMessages.header} />
      </Heading>
      <PuzzleSubbar />
      <Panel flexWrap="wrap">
        <SearchVarSetPanel
          ref={searchRef}
          filters={[
            {
              type: FilterFieldTypeEnum.TEXT,
              key: 'title',
              fieldName: <FormattedMessage {...puzzleMessages.title} />,
            },
            {
              type: FilterFieldTypeEnum.TEXT,
              key: 'content',
              fieldName: <FormattedMessage {...puzzleMessages.content} />,
            },
            {
              type: FilterFieldTypeEnum.TEXT,
              key: 'solution',
              fieldName: <FormattedMessage {...puzzleMessages.solution} />,
            },
            {
              type: FilterFieldTypeEnum.SELECT,
              key: 'genre',
              fieldName: <FormattedMessage {...puzzleMessages.genre} />,
              initialValue: null,
              options: [
                {
                  key: 'all',
                  value: null,
                  label: <FormattedMessage {...commonMessages.all} />,
                },
                {
                  key: 'classic',
                  value: Genre.CLASSIC,
                  label: <FormattedMessage {...puzzleMessages.genre_classic} />,
                },
                {
                  key: 'twentyQuestions',
                  value: Genre.TWENTY_QUESTIONS,
                  label: (
                    <FormattedMessage
                      {...puzzleMessages.genre_twentyQuestions}
                    />
                  ),
                },
                {
                  key: 'littleAlbat',
                  value: Genre.LITTLE_ALBAT,
                  label: (
                    <FormattedMessage {...puzzleMessages.genre_littleAlbat} />
                  ),
                },
                {
                  key: 'others',
                  value: Genre.OTHERS,
                  label: <FormattedMessage {...puzzleMessages.genre_others} />,
                },
              ],
            },
            {
              type: FilterFieldTypeEnum.SELECT,
              key: 'yami',
              fieldName: <FormattedMessage {...puzzleMessages.yami} />,
              initialValue: null,
              options: [
                {
                  key: 'all',
                  value: null,
                  label: <FormattedMessage {...commonMessages.all} />,
                },
                {
                  key: 'none',
                  value: Yami.NONE,
                  label: <FormattedMessage {...commonMessages.none} />,
                },
                {
                  key: 'yami',
                  value: Yami.NORMAL,
                  label: <FormattedMessage {...puzzleMessages.yami_yami} />,
                },
                {
                  key: 'longtermYami',
                  value: Yami.LONGTERM,
                  label: (
                    <FormattedMessage {...puzzleMessages.yami_longtermYami} />
                  ),
                },
              ],
            },
          ]}
        />
        <SortVarSetPanel
          ref={sortRef}
          initialField="id"
          defaultValue={[{ id: Ordering.DESC_NULLS_LAST }]}
          fields={[
            {
              key: 'id',
              fieldName: <FormattedMessage {...puzzleMessages.createdAt} />,
            },
            {
              key: 'modified',
              fieldName: <FormattedMessage {...puzzleMessages.solvedAt} />,
            },
            /*
            {
              key: 'bookmark',
              getValue: order => ({
                bookmarks_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_bookmarkCount} />
              ),
            },
            {
              key: 'comment',
              getValue: order => ({
                comments_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_commentCount} />
              ),
            },
            {
              key: 'starCount',
              getValue: order => ({
                stars_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_starCount} />
              ),
            },
            {
              key: 'starSum',
              getValue: order => ({
                stars_aggregate: { sum: { value: order } },
              }),
              fieldName: <FormattedMessage {...searchMessages.order_starSum} />,
            },
           */
          ]}
        />
        <Flex width={1}>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                const newVariables = { ...variables };
                if (searchRef.current) {
                  searchRef.current.reset();
                  newVariables.genre = null;
                  newVariables.yami = null;
                  newVariables.title = null;
                  newVariables.content = null;
                  newVariables.solution = null;
                }
                if (sortRef.current) {
                  sortRef.current.reset();
                  newVariables.orderBy = [{ id: Ordering.DESC_NULLS_LAST }];
                }
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
                if (searchRef.current) {
                  const data = searchRef.current.getData();
                  newVariables.genre = data.genre;
                  newVariables.yami = data.yami;
                  newVariables.title = asSearch(data.title);
                  newVariables.content = asSearch(data.content);
                  newVariables.solution = asSearch(data.solution);
                  newVariables.orderBy = [];
                }
                if (sortRef.current) {
                  const data = sortRef.current.getData();
                  newVariables.orderBy = data;
                }
                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.search} />
            </ButtonTransparent>
          </Box>
        </Flex>
      </Panel>
      <Flex flexWrap="wrap">
        <PaginatedQuery<
          SolvedPuzzlesSearchQuery,
          SolvedPuzzlesSearchQueryVariables
        >
          query={SOLVED_PUZZLES_SEARCH_QUERY}
          variables={variables}
          getItemCount={data => data.puzzleCount}
          renderItems={data => {
            const puzzles = data.puzzles;
            if (!puzzles) return null;
            return (
              <>
                {puzzles.map(puzzle => (
                  <MultiColBox key={puzzle.id}>
                    <PuzzleBrief puzzle={puzzle} />
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

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Search;
