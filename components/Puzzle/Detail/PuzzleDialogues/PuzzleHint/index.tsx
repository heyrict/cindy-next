import React from 'react';
import styled from '@emotion/styled';
import { text2md } from 'common';

import { FormattedTime } from 'react-intl';

import { Panel } from 'components/General';
import { PuzzleHintProps } from './types';

const BottomRight = styled.div`
  float: right;
`;

const PuzzleHint = ({ hint }: PuzzleHintProps) => (
  <Panel minHeight="2em" width={1} display="block">
    <div dangerouslySetInnerHTML={{ __html: text2md(hint.content) }} />
    <BottomRight>
      {hint.created && (
        <FormattedTime
          value={hint.created}
          year="numeric"
          month="short"
          day="numeric"
        />
      )}
    </BottomRight>
  </Panel>
);

export default PuzzleHint;
