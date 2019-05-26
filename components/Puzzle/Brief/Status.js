import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import messages from 'messages/components/puzzle';

const getStatusColor = status => {
  switch (status) {
    case 0:
      return 'koke';
    case 1:
      return 'usubeni';
    case 2:
      return 'kuri';
    case 3:
      return 'shironezumi';
    case 4:
      return 'shion';
    default:
      return 'haizakura';
  }
};

const StatusBase = styled.span`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  ${p => {
    const color = getStatusColor(p.status);
    const parsedColor = p.theme.colors[color] || color;
    return `
      border: 1px solid ${parsedColor};
      color: ${parsedColor};
    `;
  }}
`;

const StatusText = ({ status }) => {
  switch (status) {
    case 0:
      return <FormattedMessage {...messages.status_undergoing} />;
    case 1:
      return <FormattedMessage {...messages.status_solved} />;
    case 2:
      return <FormattedMessage {...messages.status_dazed} />;
    case 3:
      return <FormattedMessage {...messages.status_hidden} />;
    case 4:
      return <FormattedMessage {...messages.status_forbidden} />;
    default:
      return null;
  }
};

const Status = ({ status }) => (
  <StatusBase status={status}>
    <StatusText status={status} />
  </StatusBase>
);

Status.propTypes = {
  status: PropTypes.number.isRequired,
};

export default Status;
