import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';

import { ToastContainer, toast, Slide } from 'react-toastify';

import Flex from 'components/General/Flex';
import Button from 'components/General/Button';
import Box from 'components/General/Box';

storiesOf('Notification | Toast based notification', module).add(
  'default',
  () => (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Flex flexWrap="wrap" width={0.9}>
        <Button
          p={2}
          m={1}
          minWidth="5em"
          onClick={() => toast(<Box>Default</Box>)}
        >
          Default
        </Button>
        <Button
          p={2}
          m={1}
          minWidth="5em"
          onClick={() => toast.info(<Box>Info</Box>)}
        >
          Info
        </Button>
        <Button
          p={2}
          m={1}
          minWidth="5em"
          onClick={() => toast.success(<Box>Success</Box>)}
        >
          Success
        </Button>
        <Button
          p={2}
          m={1}
          minWidth="5em"
          onClick={() => toast.warn(<Box>Warning</Box>)}
        >
          Warning
        </Button>
        <Button
          p={2}
          m={1}
          minWidth="5em"
          onClick={() => toast.error(<Box>Error</Box>)}
        >
          Error
        </Button>
      </Flex>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        transition={Slide}
        autoClose={8000}
        closeOnClick={false}
        draggable
      />
    </ThemeProvider>
  ),
);
