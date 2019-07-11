import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';

import { FilterFieldTypeEnum } from 'components/Search/types';

storiesOf('Search | filters', module).add('default', () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Flex width={1}>
      <SearchVarSetPanel
        filters={[
          {
            type: FilterFieldTypeEnum.TEXT,
            key: 'title',
            fieldName: 'Title',
          },
          {
            type: FilterFieldTypeEnum.SELECT,
            key: 'genre',
            fieldName: 'Genre',
            initialValue: 'TW',
            options: [
              {
                key: 'UM',
                value: 'UM',
                label: 'Classic',
              },
              {
                key: 'TW',
                value: 'TW',
                label: 'Twenty Doors',
              },
            ],
          },
        ]}
      />
    </Flex>
  </ThemeProvider>
));
