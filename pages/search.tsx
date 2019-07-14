import React, { useState, useRef } from 'react';
import Head from 'next/head';

import { FormattedMessage, intlShape, IntlShape } from 'react-intl';
import searchMessages from 'messages/pages/search';
import puzzleMessages from 'messages/components/puzzle';
import puzzlePageMessages from 'messages/pages/puzzle';
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
import PuzzleSubbar from 'components/Subbar/Puzzle';
import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';
import SortVarSetPanel from 'components/Search/SortVarSetPanel';
import PuzzleBrief from 'components/Puzzle/Brief';

import { order_by } from 'generated/globalTypes';
import {
  SolvedPuzzlesSearchQuery,
  SolvedPuzzlesSearchQueryVariables,
} from 'graphql/Queries/generated/SolvedPuzzlesSearchQuery';
import { FilterFieldTypeEnum } from 'components/Search/types';
import { SearchVariablesStates } from 'pageTypes';

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];

const SPACES_REGEX = new RegExp('[ 　]+');
const inputToLike = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return `%${trimmed.replace(SPACES_REGEX, '%')}%`;
};

const Search = (_props: any, context: { intl: IntlShape }) => {
  const _: any = context.intl.formatMessage;
  const searchRef = useRef<SearchVarSetPanel>(null);
  const sortRef = useRef<SortVarSetPanel>(null);
  const [variables, setVariables] = useState({
    title: null,
    content: null,
    solution: null,
    userNickname: null,
    genre: null,
    yami: null,
    orderBy: [{ id: order_by.desc_nulls_last }],
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
              type: FilterFieldTypeEnum.TEXT,
              key: 'userNickname',
              fieldName: <FormattedMessage {...puzzlePageMessages.creator} />,
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
                  value: 0,
                  label: <FormattedMessage {...puzzleMessages.genre_classic} />,
                },
                {
                  key: 'twentyQuestions',
                  value: 1,
                  label: (
                    <FormattedMessage
                      {...puzzleMessages.genre_twentyQuestions}
                    />
                  ),
                },
                {
                  key: 'littleAlbat',
                  value: 2,
                  label: (
                    <FormattedMessage {...puzzleMessages.genre_littleAlbat} />
                  ),
                },
                {
                  key: 'others',
                  value: 3,
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
                  value: 0,
                  label: <FormattedMessage {...commonMessages.none} />,
                },
                {
                  key: 'yami',
                  value: 1,
                  label: <FormattedMessage {...puzzleMessages.yami_yami} />,
                },
                {
                  key: 'longtermYami',
                  value: 2,
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
          defaultValue={[{ id: order_by.desc_nulls_last }]}
          fields={[
            {
              key: 'id',
              fieldName: <FormattedMessage {...puzzleMessages.createdAt} />,
            },
            {
              key: 'modified',
              fieldName: <FormattedMessage {...puzzleMessages.solvedAt} />,
            },
            {
              key: 'bookmark',
              getValue: order => ({
                sui_hei_bookmarks_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_bookmarkCount} />
              ),
            },
            {
              key: 'comment',
              getValue: order => ({
                sui_hei_comments_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_commentCount} />
              ),
            },
            {
              key: 'starCount',
              getValue: order => ({
                sui_hei_stars_aggregate: { count: order },
              }),
              fieldName: (
                <FormattedMessage {...searchMessages.order_starCount} />
              ),
            },
            {
              key: 'starSum',
              getValue: order => ({
                sui_hei_stars_aggregate: { sum: { value: order } },
              }),
              fieldName: <FormattedMessage {...searchMessages.order_starSum} />,
            },
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
                  newVariables.userNickname = null;
                }
                if (sortRef.current) {
                  sortRef.current.reset();
                  newVariables.orderBy = [{ id: order_by.desc_nulls_last }];
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
                  newVariables.title = inputToLike(data.title);
                  newVariables.content = inputToLike(data.content);
                  newVariables.solution = inputToLike(data.solution);
                  newVariables.userNickname = inputToLike(data.userNickname);
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

Search.contextTypes = {
  intl: intlShape,
};

export default Search;
