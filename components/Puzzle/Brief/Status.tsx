import React from 'react';
import styled from 'theme/styled';
import { FormattedMessage } from 'react-intl';

import messages from 'messages/components/puzzle';
import { Status as StatusType } from 'generated/globalTypes';

export type StatusBaseProps = {
  status: StatusType;
};

export type StatusProps = StatusBaseProps;

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case StatusType.UNDERGOING:
      return 'red';
    case StatusType.SOLVED:
      return 'lime';
    case StatusType.DAZED:
      return 'orange';
    case StatusType.HIDDEN:
      return 'gray';
    case StatusType.FORCE_HIDDEN:
      return 'gray';
    default:
      return 'gray';
  }
};

export const StatusBase = styled.span<StatusBaseProps>`
  text-align: center;
  border-radius: 10px;
  padding: 1px 7px;
  font-weight: bold;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  ${p => {
    const color = getStatusColor(p.status);
    const parsedColor = p.theme.colors[color][6];
    /*
    return `
      border: 1px solid ${parsedColor};
      color: ${parsedColor};
    `;
     */
    return `background: ${parsedColor};`;
  }}
`;

export const StatusText = ({ status }: StatusBaseProps) => {
  switch (status) {
    case StatusType.UNDERGOING:
      return <FormattedMessage {...messages.status_undergoing} />;
    case StatusType.SOLVED:
      return <FormattedMessage {...messages.status_solved} />;
    case StatusType.DAZED:
      return <FormattedMessage {...messages.status_dazed} />;
    case StatusType.HIDDEN:
      return <FormattedMessage {...messages.status_hidden} />;
    case StatusType.FORCE_HIDDEN:
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
