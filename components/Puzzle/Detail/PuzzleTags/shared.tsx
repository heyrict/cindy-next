import styled from 'theme/styled';

export const PuzzleTagBubbleBox = styled.div`
  display: inline-flex;
  border-radius: ${p => p.theme.radii[2]}px;
  border: 2px solid ${p => p.theme.colors.indigo[1]};
  background: ${p => p.theme.colors.indigo[0]};
  color: ${p => p.theme.colors.indigo[7]};
  margin-left: ${p => p.theme.space[1]}px;
  margin-bottom: ${p => p.theme.space[1]}px;
`;
