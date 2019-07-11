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
import PuzzleBrief from 'components/Puzzle/Brief';

import { order_by } from 'generated/globalTypes';
import {
  SolvedPuzzlesSearchQuery,
  SolvedPuzzlesSearchQueryVariables,
} from 'graphql/Queries/generated/SolvedPuzzlesSearchQuery';
import { FilterFieldTypeEnum } from 'components/Search/types';
import { SearchVariablesStates } from './types';

const puzzleWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];

const SPACES_REGEX = new RegExp('[ 　]+');
const inputToLike = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return `%${trimmed.replace(SPACES_REGEX, '%')}%`;
};

const Search = (_props: any, context: { intl: IntlShape }) => {
  const _: any = context.intl.formatMessage;
  const searchRef = useRef<SearchVarSetPanel>(null!);
  const [variables, setVariables] = useState({
    title: null,
    content: null,
    solution: null,
    userNickname: null,
    genre: null,
    yami: null,
    orderBy: [],
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
        <Flex width={1}>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                if (searchRef.current) {
                  searchRef.current.reset();
                  setVariables({
                    genre: null,
                    yami: null,
                    title: null,
                    content: null,
                    solution: null,
                    userNickname: null,
                    orderBy: [],
                  });
                }
              }}
            >
              <FormattedMessage {...commonMessages.reset} />
            </ButtonTransparent>
          </Box>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                if (searchRef.current) {
                  const data = searchRef.current.getData();
                  setVariables({
                    genre: data.genre,
                    yami: data.yami,
                    title: inputToLike(data.title),
                    content: inputToLike(data.content),
                    solution: inputToLike(data.solution),
                    userNickname: inputToLike(data.userNickname),
                    orderBy: [],
                  });
                }
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
          variables={{
            ...variables,
            orderBy: [
              ...variables.orderBy,
              {
                id: order_by.desc,
              },
            ],
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

Search.contextTypes = {
  intl: intlShape,
};

export default Search;
