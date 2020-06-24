import React from 'react';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import Flex from './Flex';
import Box from './Box';
import Button from './Button';

import { ErrorReloadProps } from './types';

const ErrorReload = ({ error, refetch }: ErrorReloadProps) => {
  return (
    <Flex
      flexDirection="column"
      width={1}
      height={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center">{`${error}`}</Box>
      <Box>
        <Button onClick={() => refetch()} color="yellow.1" bg="yellow.6">
          <FormattedMessage {...commonMessages.reload} />
        </Button>
      </Box>
    </Flex>
  );
};

export default ErrorReload;
