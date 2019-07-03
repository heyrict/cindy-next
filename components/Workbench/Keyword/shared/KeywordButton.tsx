import React from 'react';

import { Box, Button } from 'components/General';

import { KeywordButtonProps } from './types';

const KeywordButton = ({ on, content, width, onClick }: KeywordButtonProps) => (
  <Box width={width || [1 / 4, 1 / 6, 1 / 4, 1 / 6]} mb={1}>
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
