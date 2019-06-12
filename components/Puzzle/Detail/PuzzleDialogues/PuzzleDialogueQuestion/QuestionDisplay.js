import React from 'react';
import PropTypes from 'prop-types';
import { line2md } from 'common';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { EditTimeSpan } from 'components/General';

const QuestionDisplay = ({ question, questionEditTimes }) => (
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

QuestionDisplay.propTypes = {
  question: PropTypes.string.isRequired,
  questionEditTimes: PropTypes.number.isRequired,
};

export default QuestionDisplay;
