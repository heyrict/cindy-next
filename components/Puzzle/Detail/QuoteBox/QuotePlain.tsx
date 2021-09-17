import React from 'react';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Pre } from './styles';

import { QuotePlainProps } from './types';

('1.Puzzle 1 by heyrict | Cindy. http://127.0.0.1:3000/puzzle/4.  ');

const QuotePlain = ({ user, title }: QuotePlainProps) => (
  <FormattedMessage
    {...puzzleMessages.quotePlain}
    values={{
      user: user.nickname,
      title,
      url:
        process.browser && window && window.location
          ? window.location.href
          : '',
    }}
  >
    {msg => (
      <Pre>
        <code>{msg}</code>
      </Pre>
    )}
  </FormattedMessage>
);

export default QuotePlain;
