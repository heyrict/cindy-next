import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage, FormattedRelative } from 'react-intl';

import messages from 'messages/components/puzzle';

const ProcessBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.ruri};
  border: 1px solid ${p => p.theme.colors.ruri};
`;

const Process = ({ count }) => <ProcessBase>Q : {count}</ProcessBase>;

Process.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Process;
