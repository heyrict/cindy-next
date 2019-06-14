import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as globalReducer from 'reducers/global';

import { IntlProvider } from 'react-intl';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import PuzzleDialogues from '../components/Puzzle/Detail/PuzzleDialogues';

// {{{ user fragment mock
const userMock = [
  {
    id: 1,
    nickname: 'Foo',
    username: 'Foo',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
  {
    id: 2,
    nickname: 'Bar',
    username: 'Bar',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
  {
    id: 3,
    nickname: 'Carrot',
    username: 'Carrot',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
];
// }}}

// {{{ http response mock
const httpLink = new HttpLink({
  fetch: (url, params) =>
    new Promise((resolve, reject) => {
      const parsedParams = JSON.parse(params.body);
      let data = {};
      switch (parsedParams.operationName) {
        case 'DialogueHintQuery':
          data = {
            sui_hei_dialogue: [
              {
                id: 1,
                good: false,
                true: false,
                question: '男は自殺しましたか？',
                questionEditTimes: 0,
                answer: 'Yes!',
                answerEditTimes: 0,
                created: '2019-06-11T09:00:00+0900',
                answeredtime: '2019-06-11T09:01:00+0900',
                sui_hei_user: userMock[0],
                __typename: 'sui_hei_dialogue',
              },
              {
                id: 2,
                good: true,
                true: false,
                question: '男の過去は関係ありますか？',
                questionEditTimes: 1,
                answer: 'Yes！',
                answerEditTimes: 2,
                created: '2019-06-11T09:01:00+0900',
                answeredtime: '2019-06-11T09:01:30+0900',
                sui_hei_user: userMock[0],
                __typename: 'sui_hei_dialogue',
              },
              {
                id: 3,
                good: false,
                true: true,
                question:
                  '男は自分が昔食べたモノを意識したので自殺しましたか？',
                questionEditTimes: 0,
                answer: 'Yes！正解です！\n正解は１０分後に発表します〜',
                answerEditTimes: 0,
                created: '2019-06-11T09:05:00+0900',
                answeredtime: '2019-06-11T09:07:30+0900',
                sui_hei_user: userMock[0],
                __typename: 'sui_hei_dialogue',
              },
              {
                id: 4,
                good: false,
                true: false,
                question: '参加します！',
                questionEditTimes: 0,
                answer: '',
                answerEditTimes: 0,
                created: '2019-06-11T09:09:00+0900',
                answeredtime: '2019-06-11T09:10:00+0900',
                sui_hei_user: userMock[2],
                __typename: 'sui_hei_dialogue',
              },
            ],
            sui_hei_hint: [
              {
                id: 1,
                content:
                  '**９時２０分**の時正解を発表します〜\nそれまで質問でもなんでもどうぞ〜',
                created: '2019-06-11T09:08:30+0900',
                __typename: 'sui_hei_hint',
              },
            ],
          };
          break;
        case 'EditQuestionMutation':
          data = {
            update_sui_hei_dialogue: {
              returning: [
                {
                  __typename: 'sui_hei_dialogue',
                  id: parsedParams.variables.dialogueId,
                  question: parsedParams.variables.question,
                  questionEditTimes: 0,
                },
              ],
              __typename: 'update_sui_hei_dialogue_returning',
            },
          };
          break;
        case 'EditAnswerMutation':
          data = {
            update_sui_hei_dialogue: {
              returning: [
                {
                  __typename: 'sui_hei_dialogue',
                  id: parsedParams.variables.dialogueId,
                  answer: parsedParams.variables.answer,
                  good: parsedParams.variables.good,
                  true: parsedParams.variables.true,
                  answerEditTimes: 0,
                },
              ],
              __typename: 'update_sui_hei_dialogue_returning',
            },
          };
          break;
        case 'DialogueHintSubscription':
          return reject(new Error('Not mocked'));
      }
      resolve({
        text: () =>
          new Promise((resolve, reject) => {
            resolve(JSON.stringify({ data }));
          }),
      });
    }),
});
// }}}

// {{{ apollo client
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-only',
    },
    mutation: {
      fetchPolicy: 'cache-only',
    },
  },
  resolvers: {
    Mutation: {
      update_sui_hei_dialogue: (_root, args) => {
        console.log('RESOLVER', args);
        return null;
      },
    },
  },
});
// }}}

// {{{ redux mock
const getReduxStore = id =>
  createStore(
    combineReducers({
      [globalReducer.scope]: globalReducer.reducer,
    }),
    {
      [globalReducer.scope]: {
        ...globalReducer.initialState,
        user: userMock[id],
      },
    },
  );

const participantReduxStore = getReduxStore(0);
const creatorReduxStore = getReduxStore(1);
// }}}

storiesOf('Views | PuzzleDialogues - 問題ページ進行画面', module)
  .add('as participant | 質問者側', () => (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="ja" initialNow={Date.now()}>
          <ReduxProvider store={participantReduxStore}>
            <Global styles={globalStyle} />
            <Flex width={1}>
              <PuzzleDialogues
                puzzleId={1}
                puzzleUser={userMock[1]}
                puzzleStatus={0}
                userId={userMock[0].id}
                anonymous={false}
              />
            </Flex>
          </ReduxProvider>
        </IntlProvider>
      </ThemeProvider>
    </ApolloProvider>
  ))
  .add('as creator | 出題者側', () => (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="ja" initialNow={Date.now()}>
          <ReduxProvider store={creatorReduxStore}>
            <Global styles={globalStyle} />
            <Flex width={1}>
              <PuzzleDialogues
                puzzleId={1}
                puzzleUser={userMock[1]}
                puzzleStatus={0}
                userId={userMock[1].id}
                anonymous={false}
              />
            </Flex>
          </ReduxProvider>
        </IntlProvider>
      </ThemeProvider>
    </ApolloProvider>
  ));
