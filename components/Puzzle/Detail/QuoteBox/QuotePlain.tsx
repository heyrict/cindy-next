import React from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Pre } from './styles';

import { QuotePlainProps } from './types';
import { defaultLocation } from 'settings';

const QuotePlain = ({ user, title }: QuotePlainProps) => {
  const router = useRouter();
  return (
    <FormattedMessage
      {...puzzleMessages.quotePlain}
      values={{
        user: user.nickname,
        title,
        url: `${defaultLocation.protocol}//${defaultLocation.host}${router.asPath}`,
      }}
    >
      {msg => (
        <Pre>
          <code>{msg}</code>
        </Pre>
      )}
    </FormattedMessage>
  );
};

export default QuotePlain;
