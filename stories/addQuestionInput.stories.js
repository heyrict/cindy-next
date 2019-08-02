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
import * as settingReducer from 'reducers/setting';

import { QuestionInputWidget } from 'components/Puzzle/Detail/AddQuestionInput';

// {{{ redux mock
const store = createStore(
  combineReducers({
    [settingReducer.scope]: settingReducer.reducer,
  }),
);
// }}}

storiesOf('Editor | AddQuestionInput - 問題ページの質問入力欄', module).add(
  'default',
  () => (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Flex width={1}>
          <QuestionInputWidget onSubmit={action('Submit')} />
        </Flex>
      </ThemeProvider>
    </ReduxProvider>
  ),
);
