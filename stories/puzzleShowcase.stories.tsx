import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { IntlProvider } from 'react-intl';

import PuzzleShowcase from 'components/Showcase/Puzzle';

storiesOf('Showcase | PuzzleShowcase', module).add('default', () => (
  <IntlProvider locale="ja">
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Flex width={1}>
        <PuzzleShowcase />
      </Flex>
    </ThemeProvider>
  </IntlProvider>
));
