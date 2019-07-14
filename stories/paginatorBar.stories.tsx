import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';
import Box from 'components/General/Box';

import { IntlProvider } from 'react-intl';

import SimplePaginatorBar from 'components/Hoc/PaginatedQuery/SimplePaginatorBar';

const SimplePaginatorBarWrapper = () => {
  const [page, setPage] = useState(1);
  const numPages = 20;
  return (
    <IntlProvider locale="ja" initialNow={Date.now()}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Flex flexWrap="wrap" py={3} width={1}>
          <Box width={1} mb={3}>
            Current Page: {page}
          </Box>
          <Box width={1}>
            <SimplePaginatorBar
              page={page}
              setPage={setPage}
              numPages={numPages}
            />
          </Box>
        </Flex>
      </ThemeProvider>
    </IntlProvider>
  );
};

storiesOf('Views | SimplePaginatorBar', module).add('default', () => (
  <SimplePaginatorBarWrapper />
));
