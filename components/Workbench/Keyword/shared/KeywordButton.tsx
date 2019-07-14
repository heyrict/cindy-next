import React from 'react';

import { Box, Button } from 'components/General';

import { KeywordButtonProps } from './types';

const KeywordButton = ({ on, content, onClick }: KeywordButtonProps) => (
  <Box width={1 / 5} mb={1}>
    <Button
      borderRadius={2}
      width={0.95}
      height={1}
      bg={on ? 'orange.6' : 'orange.3'}
      onClick={onClick}
    >
      {content}
    </Button>
  </Box>
);

export default KeywordButton;
