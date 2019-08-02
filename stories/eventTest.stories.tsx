import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';
import Button from 'components/General/Button';

storiesOf('Test | Event', module).add('default', () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Flex width={1}>
      <Button
        onMouseEnter={action('MouseEnter')}
        onMouseLeave={action('MouseLeave')}
        onMouseOver={action('MouseOver')}
        onMouseOut={action('MouseOut')}
        onFocus={action('Focus')}
        onBlur={action('Blur')}
        onClick={action('Click')}
        onTouchStart={action('TouchStart')}
        onTouchEnd={action('TouchEnd')}
      >
        Test Event
      </Button>
    </Flex>
  </ThemeProvider>
));
