import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from 'components/General';

const KeywordButton = ({ on, content, onClick }) => (
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

KeywordButton.propTypes = {
  on: PropTypes.bool.isRequired,
  content: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default KeywordButton;
