import styled from '@emotion/styled';

const Panel = styled.div`
  background-color: lightyellow;
  border-color: ${p => p.theme.colors.umenezumi};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: groove;
  margin: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[2]}px;
`;

export default Panel;
