import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { line2md } from 'common';
import { toolbar } from 'common/simplemde';

import { FormattedMessage, intlShape } from 'react-intl';
import messages from 'messages/pages/add_puzzle';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const PuzzleAddForm = () => {
  return (
    <React.Fragment>
      <SimpleMDE
        options={{
          previewRender: line2md,
          spellChecker: false,
          autoSave: {
            enabled: true,
            uniqueId: 'add-puzzle-content',
          },
          toolbar,
        }}
      />
      <SimpleMDE
        options={{
          previewRender: line2md,
          spellChecker: false,
          autoSave: {
            enabled: true,
            uniqueId: 'add-puzzle-solution',
          },
          toolbar,
        }}
      />
    </React.Fragment>
  );
};

export default PuzzleAddForm;
