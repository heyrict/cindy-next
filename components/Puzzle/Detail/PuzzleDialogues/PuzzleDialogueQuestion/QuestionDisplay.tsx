import React from 'react';
import { line2md } from 'common/markdown';
import { normPuzzleQjump } from 'common/markdown/plugin-puzzle-qjump';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { EditTimeSpan } from 'components/General';

import { QuestionDisplayProps } from './types';

const QuestionDisplay = ({
  question,
  questionEditTimes,
}: QuestionDisplayProps) => (
  <React.Fragment>
    <span
      dangerouslySetInnerHTML={{ __html: line2md(normPuzzleQjump(question)) }}
    />
    {questionEditTimes > 0 && (
      <EditTimeSpan>
        <FormattedMessage
          {...commonMessages.editTimes}
          values={{ count: questionEditTimes }}
        />
      </EditTimeSpan>
    )}
  </React.Fragment>
);

export default QuestionDisplay;
