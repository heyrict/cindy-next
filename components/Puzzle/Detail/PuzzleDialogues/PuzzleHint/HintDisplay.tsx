import React from 'react';
import { text2md } from 'common/markdown';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import puzzleMessages from 'messages/components/puzzle';

import { EditTimeSpan } from 'components/General';

import { HintDisplayProps } from './types';
import UserInline from 'components/User/UserInline';

const HintDisplay = ({ hint }: HintDisplayProps) => (
  <React.Fragment>
    <div dangerouslySetInnerHTML={{ __html: text2md(hint.content) }} />
    {hint.edittimes > 0 && (
      <EditTimeSpan>
        <FormattedMessage
          {...commonMessages.editTimes}
          values={{ count: hint.edittimes }}
        />
      </EditTimeSpan>
    )}
    {hint.receiver && (
      <React.Fragment>
        (
        <FormattedMessage
          {...puzzleMessages.hintOnly}
          values={{
            user: <UserInline user={hint.receiver} />,
          }}
        />
        )
      </React.Fragment>
    )}
  </React.Fragment>
);

export default HintDisplay;
