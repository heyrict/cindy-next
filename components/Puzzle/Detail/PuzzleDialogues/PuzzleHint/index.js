import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { text2md } from 'common';

import { FormattedTime } from 'react-intl';

import UserInline from 'components/User/UserInline';
import { Panel } from 'components/General';

const BottomRight = styled.div`
  float: right;
`;

const PuzzleHint = ({ hint, puzzleUser }) => (
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
