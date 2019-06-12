import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'lib/theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { QuestionInputWidget } from 'components/Puzzle/Detail/AddQuestionInput';

storiesOf('Editor | AddQuestionInput - 問題ページの質問入力欄', module).add(
  'default',
  () => (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Flex width={1}>
        <QuestionInputWidget onSubmit={action('Submit')} />
      </Flex>
    </ThemeProvider>
  ),
);
