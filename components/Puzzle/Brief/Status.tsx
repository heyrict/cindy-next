import React from 'react';
import styled from 'theme/styled';
import { FormattedMessage } from 'react-intl';

import messages from 'messages/components/puzzle';
import { StatusType } from './types';

export type StatusBaseProps = {
  status: StatusType;
}

export type StatusProps = StatusBaseProps

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case StatusType.Undergoing:
      return 'red';
    case StatusType.Solved:
      return 'lime';
    case StatusType.Dazed:
      return 'orange';
    case StatusType.Hidden:
      return 'gray';
    case StatusType.Forbidden:
      return 'gray';
    default:
      return 'gray';
  }
};

export const StatusBase: React.FunctionComponent<StatusBaseProps> = styled.span`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  ${p => {
    const color = getStatusColor(p.status);
    const parsedColor = p.theme.colors[color][7];
    return `
      border: 1px solid ${parsedColor};
      color: ${parsedColor};
    `;
  }}
`;

export const StatusText = ({ status }: StatusBaseProps) => {
  switch (status) {
    case StatusType.Undergoing:
      return <FormattedMessage {...messages.status_undergoing} />;
    case StatusType.Solved:
      return <FormattedMessage {...messages.status_solved} />;
    case StatusType.Dazed:
      return <FormattedMessage {...messages.status_dazed} />;
    case StatusType.Hidden:
      return <FormattedMessage {...messages.status_hidden} />;
    case StatusType.Forbidden:
      return <FormattedMessage {...messages.status_forbidden} />;
    default:
      return null;
  }
};

export const Status = ({ status }: StatusProps) => (
  <StatusBase status={status}>
    <StatusText status={status} />
  </StatusBase>
);

export default Status;
