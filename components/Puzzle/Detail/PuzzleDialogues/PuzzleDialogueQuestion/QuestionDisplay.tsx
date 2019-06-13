import React from 'react';
import { line2md } from 'common';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { EditTimeSpan } from 'components/General';

import { QuestionDisplayProps } from './types';

const QuestionDisplay = ({
  question,
  questionEditTimes,
}: QuestionDisplayProps) => (
  <React.Fragment>
    <span dangerouslySetInnerHTML={{ __html: line2md(question) }} />
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
