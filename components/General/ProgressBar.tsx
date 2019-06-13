import React from 'react';
import styled from '@emotion/styled';
import { OuterBarProps, ProgressBarProps } from './types';

const OuterBar = styled.div<OuterBarProps>`
  width: 100%;
  height: 1.2em;
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1em;
  padding: ${p => p.theme.space[1]}px;
  margin: ${p => p.theme.space[1]}px;
  &:before {
    content: '';
    display: block;
    height: 100%;
    width: ${p => p.percentage}%;
    max-width: 100%;
    border-radius: 1em;
    background-color: ${p => p.theme.colors.green[4]};
    position: relative;
  }
`;

const InnerBar = styled.div`
  height: 100%;
  width: 100%;
  font-size: 0.85em;
  text-align: center;
  position: absolute;
  top: 0.2em;
`;

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressPercentage = Math.floor(progress * 1000) / 10;
  return (
    <OuterBar percentage={progressPercentage}>
      <InnerBar>{progressPercentage} %</InnerBar>
    </OuterBar>
  );
};

export default ProgressBar;
