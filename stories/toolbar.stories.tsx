import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as globalReducer from 'reducers/global';
import * as loginReducer from 'reducers/login';
import * as settingReducer from 'reducers/setting';
import * as directReducer from 'reducers/direct';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme/theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { IntlProvider } from 'react-intl';

import ToolbarBox from 'components/Layout/ToolbarBox';
import Toolbar from 'components/Toolbar';
import { GlobalUserType } from 'reducers/types';

// {{{ apollo client
const httpLink = new HttpLink();
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-only',
    },
  },
});
// }}}

// {{{ redux mock
const getReduxStore = (user: GlobalUserType) =>
  createStore(
    combineReducers({
      [globalReducer.scope]: globalReducer.reducer,
      [loginReducer.scope]: loginReducer.reducer,
      [settingReducer.scope]: settingReducer.reducer,
      [directReducer.scope]: directReducer.reducer,
    }),
    {
      [globalReducer.scope]: {
        ...globalReducer.initialState,
        user,
      },
    } as any,
  );

const noAuthReduxStore = getReduxStore({
  id: undefined,
  nickname: undefined,
  username: undefined,
});
const authReduxStore = getReduxStore({
  id: 1,
  nickname: 'Foo',
  username: 'Foo',
});
// }}}

storiesOf('Views | ToolbarBox', module)
  .add('not logged in', () => (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <IntlProvider locale="ja">
          <ReduxProvider store={noAuthReduxStore}>
            <Global styles={globalStyle} />
            <ToolbarBox>
              <Toolbar />
            </ToolbarBox>
            <Flex width={1} height="2000px" />
          </ReduxProvider>
        </IntlProvider>
      </ApolloProvider>
    </ThemeProvider>
  ))
  .add('logged in', () => (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <IntlProvider locale="ja">
          <ReduxProvider store={authReduxStore}>
            <Global styles={globalStyle} />
            <ToolbarBox>
              <Toolbar />
            </ToolbarBox>
            <Flex width={1} height="2000px" />
          </ReduxProvider>
        </IntlProvider>
      </ApolloProvider>
    </ThemeProvider>
  ));
