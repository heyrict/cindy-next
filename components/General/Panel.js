import styled from 'theme/styled';
import { flexbox, space, color, layout, border } from 'styled-system';

const Panel = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.red[4]};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: groove;
  margin: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[2]}px;
  min-height: 9.5em;
  ${flexbox}
  ${space}
  ${color}
  ${layout}
  ${border}
`;

export default Panel;
