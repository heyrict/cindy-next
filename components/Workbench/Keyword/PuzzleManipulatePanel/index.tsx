import React from 'react';

import ReplayMetaEdit from './ReplayMetaEdit';
import ReplaySubmitButton from './ReplaySubmitButton';
import ResultPreview from '../ResultPreview';

const PuzzleManipulatePanel = () => {
  return (
    <>
      <ReplayMetaEdit />
      <ResultPreview />
      <ReplaySubmitButton />
    </>
  );
};

export default PuzzleManipulatePanel;
