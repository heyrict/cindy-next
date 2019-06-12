import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'lib/theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { PuzzleAddFormInner } from 'components/PuzzleAddForm';

storiesOf('Form | PuzzleAddForm - 出題フォーム', module).add('default', () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Flex width={1}>
      <PuzzleAddFormInner />
    </Flex>
  </ThemeProvider>
));
