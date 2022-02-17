import React from 'react';
import styled from 'theme/styled';
import { Img } from 'components/General';
import S from 'svgs/puzzleBriefStar.svg';

export const StarBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.preset.puzzle.star.fg};
  background: ${p => p.theme.colors.preset.puzzle.star.bg};
  display: inline-flex;
  align-items: center;
`;

export type StarProps = {
  count: number;
  sum: number;
};

const Star = ({ count, sum }: StarProps) => (
  <StarBase>
    <Img size="0.9em" pr="1px" src={S} />
    {count}({sum})
  </StarBase>
);

export default Star;
