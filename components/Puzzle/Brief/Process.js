import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Img } from 'components/General';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import Q from 'svgs/puzzleBriefQ.svg';

import messages from 'messages/components/puzzle';

export const ProcessBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.blue[6]};
  border: 1px solid ${p => p.theme.colors.blue[6]};
  display: inline-flex;
  align-items: center;
`;

const Process = ({ count }) => (
  <ProcessBase>
    <Img size="0.8em" pr={1} src={Q} />
    {count}
  </ProcessBase>
);

Process.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Process;
