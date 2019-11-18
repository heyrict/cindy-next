import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { IntlProvider } from 'react-intl';

import Loading from 'components/General/Loading';

storiesOf('Components | Loading', module)
  .add('default', () => (
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Flex flexWrap="wrap" py={3} width={1}>
          <Loading />
        </Flex>
      </ThemeProvider>
    </IntlProvider>
  ))
  .add('centered', () => (
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Flex flexWrap="wrap" py={3} width={1}>
          <Loading centered />
        </Flex>
      </ThemeProvider>
    </IntlProvider>
  ));
