import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import StarInput from 'components/Star/StarInput';

storiesOf('Editor | StarInput', module).add('default', () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Flex
      width={1}
      height="3em"
      alignItems="center"
      justifyContent="space-around"
    >
      <Box>Stars:</Box>
      <Box>
        <StarInput />
      </Box>
    </Flex>
  </ThemeProvider>
));
