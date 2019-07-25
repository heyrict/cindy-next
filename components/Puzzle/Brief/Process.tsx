import React from 'react';
import styled from 'theme/styled';
import { Img } from 'components/General';
import Q from 'svgs/puzzleBriefQ.svg';

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

export type ProcessProps = {
  count: number;
};

const Process = ({ count }: ProcessProps) => (
  <ProcessBase>
    <Img size="0.8em" pr={1} src={Q} />
    {count}
  </ProcessBase>
);

export default Process;
