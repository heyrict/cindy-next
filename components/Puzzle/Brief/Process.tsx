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
  color: ${p => p.theme.colors.preset.puzzle.process.fg};
  border: 1px solid ${p => p.theme.colors.preset.puzzle.process.fg};
  background: ${p => p.theme.colors.preset.puzzle.process.bg};
  display: inline-flex;
  align-items: center;
`;

export const ProcessBaseLeft = styled(ProcessBase)`
  padding: 0 3px 0 6px;
  margin-right: 0;
  border-radius: 10px 0 0 10px;
`;

export const ProcessBaseRight = styled(ProcessBase)`
  padding: 0 6px 0 3px;
  border-radius: 0 10px 10px 0;
  background: ${p => p.theme.colors.preset.puzzle.process.fg};
  border: 1px solid ${p => p.theme.colors.preset.puzzle.process.fg};
  color: ${p => p.theme.colors.preset.puzzle.process.ac};
  font-weight: bold;
`;

export type ProcessProps = {
  count: number;
  newCount?: number;
};

const Process = ({ count, newCount }: ProcessProps) => {
  return Boolean(newCount) ? (
    <>
      <ProcessBaseLeft>
        <Img size="0.8em" pr={1} src={Q} />
        {count}
      </ProcessBaseLeft>
      <ProcessBaseRight>{newCount}</ProcessBaseRight>
    </>
  ) : (
    <ProcessBase>
      <Img size="0.8em" pr={1} src={Q} />
      {count}
    </ProcessBase>
  );
};

export default Process;
