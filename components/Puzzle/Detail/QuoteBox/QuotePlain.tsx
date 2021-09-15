import React from 'react';
import { Pre } from './styles';

import { QuotePlainProps } from './types';

('1.Puzzle 1 by heyrict | Cindy. http://127.0.0.1:3000/puzzle/4.  ');

const QuotePlain = ({ user, created, title }: QuotePlainProps) => {
  const createdTime = new Date(created);
  return (
    <Pre>
      <code>
        {`${user.nickname}. ${title}. Cindy. (${createdTime
          .toISOString()
          .slice(0, 10)}). ${
          process.browser && window && window.location
            ? window.location.href
            : ''
        }.`}
      </code>
    </Pre>
  );
};

export default QuotePlain;
