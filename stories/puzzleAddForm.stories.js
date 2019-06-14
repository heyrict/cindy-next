import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';
import Box from 'components/General/Box';

import { IntlProvider } from 'react-intl';

import PuzzleAddFormInner from 'components/PuzzleAddForm/PuzzleAddFormInner';

storiesOf('Form | PuzzleAddForm - 出題フォーム', module).add('default', () => (
  <IntlProvider locale="ja" initialNow={Date.now()}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Box width={1}>
        <Flex p={3}>
          <PuzzleAddFormInner />
        </Flex>
      </Box>
    </ThemeProvider>
  </IntlProvider>
));
