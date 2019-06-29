import React from 'react';
import { line2md } from 'common/markdown';
import { normPuzzleQjump } from 'common/markdown/plugin-puzzle-qjump';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import EditTimeSpan from 'components/General/EditTimeSpan';
import { IndicatorIcon } from './components';
import goodIcon from 'svgs/bulb.svg';
import trueIcon from 'svgs/cracker.svg';

import { AnswerDisplayProps } from './types';

const AnswerDisplay = ({
  answer,
  answerEditTimes,
  trueAns,
  goodAns,
}: AnswerDisplayProps) =>
  answer === '' ? (
    <FormattedMessage {...messages.waitForAnswer} />
  ) : (
    <React.Fragment>
      {trueAns && <IndicatorIcon pr={2} pb={2} src={trueIcon} />}
      {goodAns && <IndicatorIcon pr={2} pb={2} src={goodIcon} />}
      <span
        dangerouslySetInnerHTML={{ __html: line2md(normPuzzleQjump(answer)) }}
      />
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

export default AnswerDisplay;
