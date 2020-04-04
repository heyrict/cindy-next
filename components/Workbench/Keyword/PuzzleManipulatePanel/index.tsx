import React from 'react';

import { FormattedMessage } from 'react-intl';
import addPuzzleMessages from 'messages/pages/add_puzzle';

import { Box, ButtonTransparent } from 'components/General';

import ResultPreview from '../ResultPreview';

const PuzzleManipulatePanel = () => {
  return (
    <>
      <ResultPreview />
      <Box width={1} bg="orange.6" borderRadius={2} mx={3}>
        <ButtonTransparent width={1} color="orange.0" py={1} onClick={() => {}}>
          <FormattedMessage {...addPuzzleMessages.publishPuzzle} />
        </ButtonTransparent>
      </Box>
    </>
  );
};

export default PuzzleManipulatePanel;
