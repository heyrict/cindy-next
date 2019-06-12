import React from 'react';
import PropTypes from 'prop-types';
import { line2md } from 'common';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import EditTimeSpan from 'components/General/EditTimeSpan';
import { IndicatorIcon } from './components';
import goodIcon from 'svgs/bulb.svg';
import trueIcon from 'svgs/cracker.svg';

const AnswerDisplay = ({ answer, answerEditTimes, trueAns, goodAns }) =>
  answer === '' ? (
    <FormattedMessage {...messages.waitForAnswer} />
  ) : (
    <React.Fragment>
      {trueAns && <IndicatorIcon pr={2} pb={2} src={trueIcon} />}
      {goodAns && <IndicatorIcon pr={2} pb={2} src={goodIcon} />}
      <span dangerouslySetInnerHTML={{ __html: line2md(answer) }} />
      {answerEditTimes > 0 && (
        <EditTimeSpan>
          <FormattedMessage
            {...commonMessages.editTimes}
            values={{ count: answerEditTimes }}
          />
        </EditTimeSpan>
      )}
    </React.Fragment>
  );

AnswerDisplay.propTypes = {
  answer: PropTypes.string.isRequired,
  answerEditTimes: PropTypes.number.isRequired,
  trueAns: PropTypes.bool.isRequired,
  goodAns: PropTypes.bool.isRequired,
};

export default AnswerDisplay;
